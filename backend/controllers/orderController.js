import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import transporter from "../utils/mailer.js"; // ✅ import your mailer

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems, userId, shippingAddress, paymentMethod, userEmail, username } = req.body;

    if (!cartItems?.length || !userId || !shippingAddress)
      return res.status(400).json({ message: "Invalid data" });

    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shippingFee = 10;
    const total = subtotal + shippingFee;

    const getVariantDisplay = (variant) => {
      if (!variant) return "";
      if (typeof variant === "string") return variant;
      const { color, storage, ram } = variant;
      const parts = [];
      if (color) parts.push(color.toUpperCase());
      if (storage) parts.push(storage);
      if (ram) parts.push(ram);
      return parts.length > 0 ? parts.join(" | ") : "";
    };

    // Save order
    const order = await orderModel.create({
      user: userId,
      items: cartItems.map((i) => ({
        product: i.id,
        name: i.name,
        image: i.image,
        price: i.price,
        quantity: i.qty,
        variant: getVariantDisplay(i.variant),
      })),
      subtotal,
      shippingFee,
      totalPrice: total,
      shippingAddress,
      paymentMethod,
      paymentStatus: "pending",
      orderStatus: "processing",
    });
const user = await userModel.findById(userId)
    // Send admin email notification
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // 👈 set this in your .env
      subject: `📦 New Order Placed: #${order.orderNumber || order._id.slice(-8)}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>New Order Alert!</h2>
          <p><strong>Order ID:</strong> #${order.orderNumber || order._id.slice(-8)}</p>
          <p><strong>Customer Name:</strong> ${shippingAddress.fullName}</p>
         <p><strong>Email:</strong> ${user?.email || "N/A"}</p> <!-- ✅ use fetched user -->
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
          <p><strong>Total:</strong> AED ${total.toFixed(2)}</p>
          <br/>
          <h3>Items:</h3>
          <ul>
            ${cartItems
              .map(
                (item) =>
                  `<li>${item.name}${item.variant ? ` (${getVariantDisplay(item.variant)})` : ""} - Qty: ${item.qty}</li>`
              )
              .join("")}
          </ul>
          <p>Shipping Address: ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.country}</p>
        </div>
      `,
    };

    transporter.sendMail(adminMailOptions, (err, info) => {
      if (err) console.error("Error sending admin email:", err);
      else console.log("Admin notified about new order:", info.response);
    });

    // CARD PAYMENT
    if (paymentMethod === "Card") {
      const line_items = [
        ...cartItems.map((item) => ({
          price_data: {
            currency: "aed",
            product_data: {
              name: item.name + (item.variant ? ` (${getVariantDisplay(item.variant)})` : ""),
              images: [item.image],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.qty,
        })),
        {
          price_data: {
            currency: "aed",
            product_data: {
              name: "🛒 Shipping Fee (Standard Delivery)",
              description: "Standard delivery within UAE",
            },
            unit_amount: Math.round(shippingFee * 100),
          },
          quantity: 1,
        },
      ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:5173/payment-cancel`,
        metadata: { orderId: order._id.toString() },
      });

      order.stripeSessionId = session.id;
      await order.save();

      return res.json({ url: session.url });
    }

    // COD
    return res.json({
      message: "Order placed successfully (Cash on Delivery)",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// STRIPE WEBHOOK
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    await orderModel.findByIdAndUpdate(orderId, {
      paymentStatus: "paid",
      orderStatus: "processing",
      paidAt: new Date(),
    });

    console.log(`✅ Order ${orderId} marked as paid`);
  }

  res.json({ received: true });
};

// ADMIN - UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, trackingNumber } = req.body;

    const updateData = { orderStatus: status };
    if (status === "shipped") updateData.shippedAt = new Date();
    if (status === "delivered") updateData.deliveredAt = new Date();
    if (trackingNumber) updateData.trackingNumber = trackingNumber;

    const order = await orderModel.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user") // user info
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER ORDERS
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderModel
      .find({ user: userId })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN - DELETE ORDER
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await orderModel.findByIdAndDelete(orderId);

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
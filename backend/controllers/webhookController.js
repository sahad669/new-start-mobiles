import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  console.log("🚀 WEBHOOK HIT!")
  console.log("➡️  Webhook hit, headers:", req.headers["stripe-signature"]);

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("❌ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("✅ Webhook verified, type:", event.type); // ADD THIS

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;
    
    console.log("🔍 Looking for orderId:", orderId); // ADD THIS
    console.log("🔍 Session metadata:", session.metadata); // ADD THIS

    // Find order BEFORE update
    const orderBefore = await orderModel.findById(orderId);
    console.log("🔍 Order before update:", orderBefore?.paymentStatus); // ADD THIS

    await orderModel.findByIdAndUpdate(orderId, {
      paymentStatus: "paid",
      orderStatus: "processing",
      paidAt: new Date(),
    });

    // Find order AFTER update
    const orderAfter = await orderModel.findById(orderId);
    console.log("✅ Order after update:", orderAfter?.paymentStatus); // ADD THIS
    console.log(`✅ Order ${orderId} marked as paid`);
  }

  res.json({ received: true });
};

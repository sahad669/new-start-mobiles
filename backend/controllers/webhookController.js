import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
    console.log("➡️  Webhook hit, headers:", req.headers["stripe-signature"]); // debug
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
  

  // 🎯 Payment Success Event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const orderId = session.metadata.orderId;

    // Update the pending order to paid
    await orderModel.findByIdAndUpdate(orderId, {
      paymentStatus: "paid",
      orderStatus: "processing",
    });

    console.log(`✅ Order ${orderId} marked as paid`);
  }

  res.json({ received: true });
};
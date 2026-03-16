// models/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
      default: () =>
        "ORD-" +
        new Date().getFullYear() +
        "-" +
        Math.floor(100000 + Math.random() * 900000),
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
        variant: String,
      },
    ],

    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },

    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      country: String,
      postalCode: String,
    },

    paymentMethod: { type: String, enum: ["COD", "Card"], default: "COD" },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paidAt: Date,
    stripeSessionId: String,

    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },

    shippedAt: Date,
    deliveredAt: Date,
    trackingNumber: String,
  },
  { timestamps: true },
);

export default mongoose.model("Orders", orderSchema);

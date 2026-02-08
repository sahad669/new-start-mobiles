import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },

    condition: { type: String, enum: ["new", "used"], required: true },

    description: String,

    images: [String],

    specifications: {
      screen: String,
      processor: String,
      camera: String,
      battery: String,
      os: String,
    },

    variants: [
      {
        color: String,
        storage: String,
        ram: String,
        price: { type: Number, required: true },
        stock: { type: Number, default: 0 },
      },
    ],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product",productSchema)
export default productModel

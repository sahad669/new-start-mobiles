import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  
  },

);
const brandModel = mongoose.model("mobileBrands",brandSchema)
export default brandModel

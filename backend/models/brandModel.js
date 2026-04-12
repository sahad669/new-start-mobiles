import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:false,
      unique: true,
      trim: true,
    },
  
  },

);
const brandModel = mongoose.model("MobileBrands",brandSchema)
export default brandModel

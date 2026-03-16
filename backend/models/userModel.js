import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
 {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }, // ← change from addressLine
    city: { type: String, required: true },
    country: { type: String, default: "United Arab Emirates" },
    postalCode: { type: String },
    

    location: {
      lat: { type: Number },
      lng: { type: Number },
    },

    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },

  // 🔥 ADD THIS
  addresses: [addressSchema],
});

const userModel = mongoose.model("users", userSchema);
export default userModel;

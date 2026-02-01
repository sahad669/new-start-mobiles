import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
      message: "Account created successfully. Please login.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email Not Found Register!" });
    }

    const verified = await bcrypt.compare(password, user.password);
    if (!verified) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        userId: user._id,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

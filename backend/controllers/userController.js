// import userModel from "../models/userModel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import transporter from "../utils/mailer.js";

// export const registerUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Validate input
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if user exists
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     await userModel.create({
//       username,
//       email,
//       password: hashedPassword,
//       role: "user",
//     });

//     // Send welcome email
//     const mailOptions = {
//       from: process.env.EMAIL_USER, // your email
//       to: email, // user's registered email
//       subject: "Welcome to New Star!",
//       html: `
//         <div style="font-family: sans-serif; text-align: center;">
//           <h2>Hello ${username},</h2>
//           <p>🎉 Your account has been successfully registered!</p>
//           <p>Welcome to <strong>New Star</strong> — explore the latest products and exclusive offers.</p>
//           <p>We’re excited to have you onboard.</p>
//           <br/>
//           <p>Cheers,<br/>The New Star Team</p>
//         </div>
//       `,
//     };

//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) console.error("Error sending email:", err);
//       else console.log("Welcome email sent:", info.response);
//     });

//     // Send response to frontend
//     res.status(201).json({
//       message: "Account created successfully. Please check your email for a welcome message.",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Something went wrong. Please try again later.",
//     });
//   }
// };

import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../utils/mailer.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    // ✅ BREVO WELCOME EMAIL
    await sendWelcomeEmail(email, username);

    res.status(201).json({
      message: "Account created successfully. Please check your email.",
    });

  } catch (error) {
    console.error(error);
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
        name:user.username
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//add address 
export const addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;

    const user = await userModel.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.addresses.length === 0) {
      address.isDefault = true;
    }

    user.addresses.push(address);

    await user.save();

    res.json({
      message: "Address added successfully",
      addresses: user.addresses
    });

  } catch (error) {
    res.status(500).json({ message: "Add address failed" });
  }
};
//default address set
export const setDefaultAddress = async (req, res) => {
  try {

    const { userId, addressId } = req.params;

    const user = await userModel.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses.forEach((addr) => {
      addr.isDefault = addr._id.toString() === addressId;
    });

    await user.save();

    res.json({
      message: "Default address updated",
      addresses: user.addresses
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to set default address" });
  }
};
 //get all address
export const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.addresses);

  } catch (error) {
    res.status(500).json({ message: "Fetch addresses failed", error });
  }
};

//edit address 
export const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const updatedData = req.body;

    const user = await userModel.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const address = user.addresses.id(addressId);

    if (!address)
      return res.status(404).json({ message: "Address not found" });

    Object.assign(address, updatedData);

    await user.save();

    res.json({
      message: "Address updated",
      addresses: user.addresses,
    });

  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

//delete address 
export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const user = await userModel.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const address = user.addresses.id(addressId);

    if (!address)
      return res.status(404).json({ message: "Address not found" });

    address.deleteOne();

    await user.save();

    res.json({
      message: "Address deleted",
      addresses: user.addresses,
    });

  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};
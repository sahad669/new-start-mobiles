

import {sendEmail} from "../utils/mailer.js"

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    await sendEmail({ name, email, phone, message });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log("EMAIL ERROR:", error.response?.body || error.message);
    res.status(500).json({ message: "Email failed" });
  }
};
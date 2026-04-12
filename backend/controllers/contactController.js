// import transporter from "../utils/mailer.js";

// export const sendContactEmail = async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER, // your email (admin)
//       subject: "New Contact Message",
//       html: `
//         <h3>New Contact Message</h3>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phone}</p>
//         <p><b>Message:</b> ${message}</p>
//       `,
//     });

//     res.status(200).json({ message: "Message sent successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Email failed" });
//   }
// };


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
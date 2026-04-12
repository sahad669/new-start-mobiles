// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export default transporter;

import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmail = async ({ name, email, phone, message }) => {
  try {
    return await emailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_USER,
        name: "New Start Mobiles",
      },
      to: [
        {
          email: process.env.EMAIL_USER,
        },
      ],
      subject: "New Contact Message",
      htmlContent: `
        <h3>New Contact Message</h3>

        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
         <img 
      src="https://new-start-mobiles.vercel.app/images/New-star-logo-with-name.png"
      alt="New Star Mobiles"
      style="width:150px; margin-bottom:20px;"
    />

      `,
    });
  } catch (err) {
    console.log("BREVO ERROR:", err.response?.body || err.message);
    throw err;
  }
};

// 🎉 Welcome email (REGISTER)
export const sendWelcomeEmail = async (email, username) => {
  try {
    return await emailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_USER,
        name: "New Start Mobiles",
      },
      to: [{ email }],
      subject: "Welcome to New Star!",
      htmlContent: `
        <div style="font-family: Arial; text-align: center;">
         <img 
      src="https://new-start-mobiles.vercel.app/images/New-star-logo-with-name.png"
      alt="New Star Mobiles"
      style="width:150px; margin-bottom:20px;"
    />
          <h2>Hello ${username},</h2>
          <p>🎉 Your account has been successfully created!</p>
          <p>Welcome to <strong>New Star Mobiles</strong>.</p>
          <p>Explore latest mobiles and offers now.</p>
          <br/>
          <p>Cheers,<br/>Team New Star</p>
        </div>
      `,
    });
  } catch (err) {
    console.log("WELCOME EMAIL ERROR:", err.response?.body || err.message);
    throw err;
  }
};

export const sendOrderAdminEmail = async (orderData) => {
  try {
    const {
      orderNumber,
      shippingAddress,
      userEmail,
      paymentMethod,
      total,
      cartItems,
    } = orderData;

    return await emailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_USER,
        name: "New Start Mobiles",
      },
      to: [{ email: process.env.EMAIL_USER }], // admin email

      subject: `📦 New Order Placed: #${orderNumber}`,

      htmlContent: `
        <div style="font-family: Arial; line-height:1.5;">
          <h2>New Order Alert 🚨</h2>
          <img 
     src="https://new-start-mobiles.vercel.app/images/New-star-logo-with-name.png"
      alt="New Star Mobiles"
      style="width:150px; margin-bottom:20px;"
    />

          <p><strong>Order ID:</strong> #${orderNumber}</p>
          <p><strong>Customer Email:</strong> ${userEmail}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
          <p><strong>Total:</strong> AED ${total}</p>

          <h3>Items:</h3>
          <ul>
            ${cartItems
              .map(
                (item) => `
              <li>
                ${item.name} - Qty: ${item.qty}
              </li>`,
              )
              .join("")}
          </ul>

          <h3>Shipping Address:</h3>
          <p>
            ${shippingAddress.fullName}<br/>
            ${shippingAddress.address}<br/>
            ${shippingAddress.city}, ${shippingAddress.country}
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.log("ORDER EMAIL ERROR:", err.response?.body || err.message);
    throw err;
  }
};

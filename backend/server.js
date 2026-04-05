import express from "express";
import dotenv from "dotenv";
import connect from "./config/connectDB.js";
import cors from "cors";
import upload from "./middleware/multer.js";

import userRouter from "./routes/userRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import brandRouter from "./routes/brandRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import { stripeWebhook } from "./controllers/webhookController.js";
import contactRouter from "./routes/contactRouter.js"

dotenv.config();

const app = express();

/* =========================
   🚨 STRIPE WEBHOOK (MUST BE FIRST)
   ========================= */

app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

/* =========================
   NORMAL MIDDLEWARES
   ========================= */

app.use(express.json()); // AFTER webhook
app.use(cors());

/* =========================
   ROUTES
   ========================= */

app.use("/api/users", userRouter);
app.use("/api/Category", categoryRouter);
app.use("/api/MobileBrands", brandRouter);
app.use("/api/Products", productRouter);
app.use("/api/Orders", orderRouter);
app.use("/api/contactform", contactRouter);

/* =========================
   IMAGE UPLOAD
   ========================= */

app.post(
  "/products-image",
  upload.array("images",5),
  (req, res) => {
    try {
      const uploadedImages = req.files.map((file) => ({
        url: file.path || file.secure_url,
        public_id: file.filename || file.public_id,
      }));

      res.json({
        success: true,
        images: uploadedImages,
      });
    } catch (error) {
      console.error("Upload error", error);
      res.status(500).json({
        success: false,
        error: "Upload failed",
      });
    }
  }
);

/* =========================
   DATABASE + SERVER
   ========================= */

connect();

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
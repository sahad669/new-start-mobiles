import express from "express"
import dotenv from "dotenv"
import connect from "./config/connectDB.js"
import cors from "cors"
import upload from "./middleware/multer.js"
import userRouter from "./routes/userRouter.js"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())


app.use("/api/user",userRouter)


connect()
app.listen(process.env.PORT,()=>{
    console.log("server connected")
})


app.post("/products-image", upload.array("images", 3), (req, res) => {
  try {
    // Map all uploaded files to get URL and public_id
    const uploadedImages = req.files.map(file => ({
      url: file.path || file.secure_url,
      public_id: file.filename || file.public_id,
    }));

    res.json({
      success: true,
      images: uploadedImages, // array of 3 uploaded images
    });
  } catch (error) {
    console.error("Upload error", error);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
});

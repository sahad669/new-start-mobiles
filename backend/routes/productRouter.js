import express from "express"
import { addProduct,editProduct,deleteProduct,getAllProduct,getProductById,getFilteredProducts } from "../controllers/productController.js"
import upload from "../middleware/multer.js"
import {isLogged,checkAdmin} from "../middleware/authMiddleware.js"

const router = express.Router()

// router.get()
router.post("/addproduct",upload.array("images",5),isLogged,checkAdmin,addProduct)
router.patch("/editproduct/:id",upload.array("images",5),isLogged,checkAdmin,editProduct)
router.delete("/deleteproduct/:id",isLogged,checkAdmin,deleteProduct)
router.get("/getallproduct",getAllProduct)
router.get("/getbyid/:id",getProductById)
router.get("/",getFilteredProducts);

export default router
import express from "express"
import { addBrand,editBrand,deleteBrand,getAllBrand } from "../controllers/brandController.js"
import {isLogged,checkAdmin} from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/getallbrand",getAllBrand)
router.post("/add",isLogged,checkAdmin,addBrand)
router.patch("/editbrand/:id",isLogged,checkAdmin,editBrand)
router.delete("/deletebrand/:id",isLogged,checkAdmin,deleteBrand)


export default router
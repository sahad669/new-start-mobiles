import express from "express"
import { addBrand,editBrand,deleteBrand,getAllBrand } from "../controllers/brandController.js"


const router = express.Router()

router.get("/getallbrand",getAllBrand)
router.post("/addbrand",addBrand)
router.patch("/editbrand/:id",editBrand)
router.delete("/deletbrand/:id",deleteBrand)


export default router
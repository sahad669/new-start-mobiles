import express from "express"

import{addCategory,editCategory,deleteCategory,getAllCategory} from "../controllers/categoryController.js"
import {isLogged,checkAdmin} from "../middleware/authMiddleware.js"
const router = express.Router()

router.get("/getallcategory",getAllCategory)
router.post("/addcategory",isLogged,checkAdmin,addCategory)
router.patch("/editcategory/:id",isLogged,checkAdmin,editCategory)
router.delete("/deletecategory/:id",isLogged,checkAdmin,deleteCategory)


export default router
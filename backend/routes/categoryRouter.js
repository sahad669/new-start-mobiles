import express from "express"

import{addCategory,editCategory,deleteCategory,getAllCategory} from "../controllers/categoryController.js"

const router = express.Router()

router.get("/getallcategory",getAllCategory)
router.post("/addcategory",addCategory)
router.patch("/editcategory/:id",editCategory)
router.delete("/deletecategory/:id",deleteCategory)


export default router
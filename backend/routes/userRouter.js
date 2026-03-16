import express from "express";
import {
  loginUser,
  registerUser,
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} from "../controllers/userController.js";
import {isLogged} from "../middleware/authMiddleware.js"

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/address/add",isLogged,addAddress);
router.get("/address/:userId",isLogged,getAddresses);
router.put("/address/:userId/:addressId",isLogged,updateAddress);
router.put("/address/default/:userId/:addressId",isLogged,setDefaultAddress);
router.delete("/address/:userId/:addressId",isLogged,deleteAddress);

export default router;

import express from "express";
import {
  createCheckoutSession,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder
} from "../controllers/orderController.js";
import {isLogged,checkAdmin} from "../middleware/authMiddleware.js"

const router = express.Router();

// Checkout
router.post("/createcheckout", createCheckoutSession);

// Admin
router.get("/all",isLogged,checkAdmin,getAllOrders);
router.patch("/status/:orderId", updateOrderStatus);
router.delete("/:orderId",isLogged,checkAdmin,deleteOrder);

// User
router.get("/user/:userId", getUserOrders);

export default router;
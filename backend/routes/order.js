import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Create order (called after Stripe payment - simulate this for now)
router.post("/", async (req, res) => {
  try {
    const { items, email, totalAmount } = req.body;
    const order = await Order.create({ items, email, totalAmount });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders (admin)
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// Update order status (admin)
router.put("/:id", async (req, res) => {
  const { status } = req.body;
  const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(updated);
});

export default router;

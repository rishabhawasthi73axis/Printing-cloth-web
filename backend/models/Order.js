import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  items: [
    {
      productId: String,
      name: String,
      variant: String,
      quantity: Number,
      price: Number,
    }
  ],
  email: String,
  totalAmount: Number,
  status: { type: String, default: "Processing" }, // options: Processing, Shipped, Delivered
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", OrderSchema);

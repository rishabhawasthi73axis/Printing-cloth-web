import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [String],
  variants: {
    size: [String],
    color: [String],
    type: [String], // e.g. hoodie, t-shirt
  },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);

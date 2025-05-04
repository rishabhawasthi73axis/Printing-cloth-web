import mongoose from 'mongoose';
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    inventory: {
      type: Number,
      required: true,
      default: 0
    },
    variants: {
      type: String,
      required: true
    },
    colors: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
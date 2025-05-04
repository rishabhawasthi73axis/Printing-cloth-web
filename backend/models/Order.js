import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }
);

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    items: [orderItemSchema],
    total: {
      type: Number,
      required: true,
      default: 0.0
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'In Processing', 'Shipped', 'Delivered', 'Canceled'],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);

export { Order };
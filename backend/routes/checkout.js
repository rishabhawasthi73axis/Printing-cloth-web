import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET);

router.post("/", async (req, res) => {
  const { cart, email } = req.body;

  const lineItems = cart.map(item => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: `${item.product.name} (${item.variant})`,
      },
      unit_amount: item.product.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    customer_email: email,
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cart",
  });

  res.json({ url: session.url });
});

export default router;

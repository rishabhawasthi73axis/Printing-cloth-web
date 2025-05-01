import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.map((item, i) => (
        <div key={i} className="border p-2 mb-2 flex justify-between items-center">
          <div>
            <h3>{item.product.name}</h3>
            <p>Variant: {item.variant}</p>
            <p>Qty: {item.quantity}</p>
          </div>
          <button onClick={() => removeFromCart(item.product._id, item.variant)}>Remove</button>
        </div>
      ))}
      <h3 className="mt-4">Total: ${total.toFixed(2)}</h3>
      <Link to="/checkout" className="btn mt-4 block bg-blue-500 text-white p-2 rounded">
        Proceed to Checkout
      </Link>
    </div>
  );
}

export default Cart;

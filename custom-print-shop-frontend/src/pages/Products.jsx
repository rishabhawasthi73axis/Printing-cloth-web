import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {products.map(product => (
        <Link key={product._id} to={`/product/${product._id}`} className="border p-2 rounded">
          <img src={product.images[0]} className="h-32 object-cover" />
          <h3 className="font-bold">{product.name}</h3>
          <p>${product.price}</p>
        </Link>
      ))}
    </div>
  );
}

export default Products;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <img src={product.images[0]} className="h-64 object-cover" />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-700">${product.price}</p>
      <p>{product.description}</p>
      {/* TODO: Add design upload, variant selection */}
    </div>
  );
}

export default ProductPage;

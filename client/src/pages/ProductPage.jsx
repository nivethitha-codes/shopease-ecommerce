import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useGetProductDetailsQuery } from "../redux/api/productsApiSlice";
import { addToCart } from "../redux/slices/cartSlice";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import QuantityStepper from "../components/QuantityStepper";

const ProductPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const { data: product, isLoading, isError, error } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to cart");
    navigate("/cart");
  };

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="danger">{error?.data?.message || "Product not found"}</Message>;

  return (
    <div className="container fade-in" style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
      <div className="product-img-wrap" style={{ width: "380px", height: "380px", borderRadius: "12px" }}>
        <img src={product.image} alt={product.name} style={{ borderRadius: "12px" }} />
      </div>
      <div className="panel" style={{ flex: 1, minWidth: "280px" }}>
        <h2>{product.name}</h2>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <p style={{ margin: "15px 0", color: "#ccc" }}>{product.description}</p>
        <div className="product-price">${product.price}</div>
        <p style={{ marginTop: "10px", color: "#999" }}>Brand: {product.brand}</p>
        <p style={{ marginBottom: "16px" }}>
          <span className={`badge ${product.countInStock > 0 ? "badge-success" : "badge-danger"}`}>
            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>

        {product.countInStock > 0 && (
          <div style={{ margin: "16px 0", display: "flex", alignItems: "center", gap: "14px" }}>
            <span>Quantity:</span>
            <QuantityStepper qty={qty} max={product.countInStock} onChange={setQty} />
          </div>
        )}

        <button onClick={addToCartHandler} disabled={product.countInStock === 0} className="btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
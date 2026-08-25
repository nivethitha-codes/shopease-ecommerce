import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Rating from "./Rating";
import { addToCart } from "../redux/slices/cartSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const quickAddHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="product-card fade-in">
      <Link to={`/product/${product._id}`}>
        <div className="product-img-wrap">
          {product.rating >= 4.7 && <span className="product-badge badge-bestseller">Bestseller</span>}
          {product.countInStock > 0 && product.countInStock <= 5 && (
            <span className="product-badge badge-lowstock" style={{ top: product.rating >= 4.7 ? "42px" : "12px" }}>
              Only {product.countInStock} left
            </span>
          )}
          <img src={product.image} alt={product.name} />
        </div>
      </Link>
      <div className="product-card-body">
        <Link to={`/product/${product._id}`}>
          <h3>{product.name}</h3>
        </Link>
        <Rating value={product.rating} text={`(${product.numReviews})`} />
        <div className="product-price">${product.price}</div>
      </div>
      {product.countInStock > 0 && (
        <button className="quick-add" onClick={quickAddHandler}>
          Quick Add to Cart
        </button>
      )}
    </div>
  );
};

export default Product;
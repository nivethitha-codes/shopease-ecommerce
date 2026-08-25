import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import Message from "../components/Message";
import QuantityStepper from "../components/QuantityStepper";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector((state) => state.cart);

  const changeQtyHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container fade-in" style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
      <div style={{ flex: 2, minWidth: "300px" }}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty. <Link to="/">Go Back</Link>
          </Message>
        ) : (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="panel"
              style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "12px" }}
            >
              <img src={item.image} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} />
              <Link to={`/product/${item._id}`} style={{ flex: 1 }}>
                {item.name}
              </Link>
              <span style={{ color: "#d4ff00", fontWeight: 700 }}>${item.price}</span>
              <QuantityStepper qty={item.qty} max={item.countInStock} onChange={(q) => changeQtyHandler(item, q)} />
              <button onClick={() => removeFromCartHandler(item._id)} className="btn-danger">
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="panel" style={{ flex: 1, minWidth: "260px", height: "fit-content" }}>
          <h3>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)</h3>
          <p style={{ marginTop: "10px" }}>Items: ${itemsPrice}</p>
          <p>Shipping: ${shippingPrice}</p>
          <p>Tax: ${taxPrice}</p>
          <h4 style={{ margin: "12px 0", color: "#d4ff00" }}>Total: ${totalPrice}</h4>
          <button onClick={checkoutHandler} className="btn" style={{ width: "100%" }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../redux/api/ordersApiSlice";
import { clearCartItems } from "../redux/slices/cartSlice";
import Message from "../components/Message";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress?.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || "Could not place order");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Place Order</h1>
      <p>
        <strong>Shipping:</strong> {cart.shippingAddress?.address}, {cart.shippingAddress?.city},{" "}
        {cart.shippingAddress?.postalCode}, {cart.shippingAddress?.country}
      </p>
      <p><strong>Payment Method:</strong> {cart.paymentMethod}</p>

      <h3>Order Items</h3>
      {cart.cartItems.length === 0 ? (
        <Message variant="info">Your cart is empty</Message>
      ) : (
        cart.cartItems.map((item) => (
          <div key={item._id} style={{ display: "flex", gap: "10px", padding: "8px 0" }}>
            <img src={item.image} alt={item.name} style={{ width: "40px", height: "40px" }} />
            <Link to={`/product/${item._id}`}>{item.name}</Link>
            <span>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</span>
          </div>
        ))
      )}

      <div style={{ marginTop: "20px", border: "1px solid #333", padding: "15px", borderRadius: "8px" }}>
        <p>Items: ${cart.itemsPrice}</p>
        <p>Shipping: ${cart.shippingPrice}</p>
        <p>Tax: ${cart.taxPrice}</p>
        <h3>Total: ${cart.totalPrice}</h3>
        <button
          onClick={placeOrderHandler}
          disabled={cart.cartItems.length === 0 || isLoading}
          style={{ padding: "10px 20px", width: "100%" }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
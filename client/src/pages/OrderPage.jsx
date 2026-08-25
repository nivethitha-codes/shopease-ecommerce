import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetOrderDetailsQuery, usePayOrderMutation } from "../redux/api/ordersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, isError, refetch } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const markAsPaidHandler = async () => {
    try {
      await payOrder(orderId).unwrap();
      toast.success("Order marked as paid");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Error updating order");
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="danger">Order not found</Message>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Order {order._id}</h1>
      <p><strong>Name:</strong> {userInfo?.name}</p>
      <p>
        <strong>Shipping:</strong> {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
      </p>
      <p><strong>Status:</strong> {order.status}</p>

      {order.isPaid ? (
        <Message variant="success">Paid on {new Date(order.paidAt).toLocaleDateString()}</Message>
      ) : (
        <Message variant="danger">Not Paid</Message>
      )}

      <h3>Order Items</h3>
      {order.orderItems.map((item) => (
        <div key={item.product} style={{ display: "flex", gap: "10px", padding: "8px 0" }}>
          <img src={item.image} alt={item.name} style={{ width: "40px", height: "40px" }} />
          <Link to={`/product/${item.product}`}>{item.name}</Link>
          <span>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</span>
        </div>
      ))}

      <div style={{ marginTop: "20px", border: "1px solid #333", padding: "15px", borderRadius: "8px" }}>
        <p>Items: ${order.itemsPrice}</p>
        <p>Shipping: ${order.shippingPrice}</p>
        <p>Tax: ${order.taxPrice}</p>
        <h3>Total: ${order.totalPrice}</h3>

        {!order.isPaid && (
          <button onClick={markAsPaidHandler} disabled={loadingPay} style={{ padding: "10px 20px", width: "100%" }}>
            Mark As Paid (Demo)
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
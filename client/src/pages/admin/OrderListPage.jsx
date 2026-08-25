import { useGetOrdersQuery, useUpdateOrderStatusMutation } from "../../redux/api/ordersApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const OrderListPage = () => {
  const { data: orders, isLoading, isError, error, refetch } = useGetOrdersQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();

  const statusChangeHandler = async (orderId, status) => {
    try {
      await updateStatus({ orderId, status }).unwrap();
      toast.success("Order status updated");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Error updating status");
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="danger">{error?.data?.message}</Message>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Orders</h1>
      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #333" }}>
            <th style={{ textAlign: "left", padding: "8px" }}>ID</th>
            <th style={{ textAlign: "left", padding: "8px" }}>USER</th>
            <th style={{ textAlign: "left", padding: "8px" }}>DATE</th>
            <th style={{ textAlign: "left", padding: "8px" }}>TOTAL</th>
            <th style={{ textAlign: "left", padding: "8px" }}>PAID</th>
            <th style={{ textAlign: "left", padding: "8px" }}>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} style={{ borderBottom: "1px solid #222" }}>
              <td style={{ padding: "8px" }}>{order._id}</td>
              <td style={{ padding: "8px" }}>{order.user?.name || "Deleted user"}</td>
              <td style={{ padding: "8px" }}>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: "8px" }}>${order.totalPrice}</td>
              <td style={{ padding: "8px" }}>{order.isPaid ? "Yes" : "No"}</td>
              <td style={{ padding: "8px" }}>
                <select value={order.status} onChange={(e) => statusChangeHandler(order._id, e.target.value)}>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderListPage;
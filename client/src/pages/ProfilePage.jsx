import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../redux/api/usersApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { useGetMyOrdersQuery } from "../redux/api/ordersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updateProfile, { isLoading: loadingUpdate }] = useProfileMutation();
  const { data: orders, isLoading: loadingOrders, isError, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await updateProfile({
        name,
        email,
        ...(password && { password }),
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile updated");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <div style={{ padding: "20px", display: "flex", gap: "40px", flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: "280px" }}>
        <h1>My Profile</h1>
        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: "12px" }}>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "8px" }} />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "8px" }} />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label>New Password (leave blank to keep current)</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "8px" }} />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label>Confirm New Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: "100%", padding: "8px" }} />
          </div>
          <button type="submit" disabled={loadingUpdate} style={{ padding: "10px 20px" }}>
            Update Profile
          </button>
        </form>
      </div>

      <div style={{ flex: 2, minWidth: "300px" }}>
        <h1>My Orders</h1>
        {loadingOrders ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">{error?.data?.message || "Could not load orders"}</Message>
        ) : orders.length === 0 ? (
          <Message variant="info">
            No orders yet. <Link to="/">Start shopping</Link>
          </Message>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #333" }}>
                <th style={{ textAlign: "left", padding: "8px" }}>ID</th>
                <th style={{ textAlign: "left", padding: "8px" }}>DATE</th>
                <th style={{ textAlign: "left", padding: "8px" }}>TOTAL</th>
                <th style={{ textAlign: "left", padding: "8px" }}>PAID</th>
                <th style={{ textAlign: "left", padding: "8px" }}>STATUS</th>
                <th style={{ padding: "8px" }}></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "8px" }}>{order._id.slice(-8)}</td>
                  <td style={{ padding: "8px" }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "8px" }}>${order.totalPrice}</td>
                  <td style={{ padding: "8px" }}>{order.isPaid ? "Yes" : "No"}</td>
                  <td style={{ padding: "8px" }}>{order.status}</td>
                  <td style={{ padding: "8px" }}>
                    <Link to={`/order/${order._id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
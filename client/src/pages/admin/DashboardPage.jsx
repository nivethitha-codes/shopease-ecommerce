import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/productsApiSlice";
import { useGetOrdersQuery } from "../../redux/api/ordersApiSlice";
import { useGetUsersQuery } from "../../redux/api/usersAdminApiSlice";
import Loader from "../../components/Loader";

const DashboardPage = () => {
  const { data: productsData, isLoading: loadingProducts } = useGetProductsQuery({});
  const { data: orders, isLoading: loadingOrders } = useGetOrdersQuery();
  const { data: users, isLoading: loadingUsers } = useGetUsersQuery();

  if (loadingProducts || loadingOrders || loadingUsers) return <Loader />;

  const totalRevenue = orders
    ?.filter((o) => o.isPaid)
    .reduce((acc, o) => acc + o.totalPrice, 0)
    .toFixed(2);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <div className="stats-grid" style={{ marginTop: "20px" }}>
        <div className="stat-card">
          <h4>Total Products</h4>
          <p>{productsData?.products?.length || 0}</p>
        </div>
        <div className="stat-card">
          <h4>Total Orders</h4>
          <p>{orders?.length || 0}</p>
        </div>
        <div className="stat-card">
          <h4>Total Users</h4>
          <p>{users?.length || 0}</p>
        </div>
        <div className="stat-card">
          <h4>Revenue (Paid)</h4>
          <p>${totalRevenue || "0.00"}</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <Link to="/admin/productlist" className="btn">Manage Products</Link>
        <Link to="/admin/orderlist" className="btn btn-outline">Manage Orders</Link>
        <Link to="/admin/userlist" className="btn btn-outline">Manage Users</Link>
      </div>
    </div>
  );
};

export default DashboardPage;
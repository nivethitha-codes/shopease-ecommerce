import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductListPage from "./pages/admin/ProductListPage";
import ProductEditPage from "./pages/admin/ProductEditPage";
import OrderListPage from "./pages/admin/OrderListPage";
import UserListPage from "./pages/admin/UserListPage";
import UserEditPage from "./pages/admin/UserEditPage";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <ToastContainer />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="" element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
          </Route>

          <Route path="" element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/productlist" element={<ProductListPage />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
            <Route path="/admin/orderlist" element={<OrderListPage />} />
            <Route path="/admin/userlist" element={<UserListPage />} />
            <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
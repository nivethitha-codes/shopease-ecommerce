import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/api/usersApiSlice";
import { logout } from "../redux/slices/authSlice";
import { resetCart } from "../redux/slices/cartSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
      setMenuOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" onClick={closeMenu}>ShopNest</Link>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/cart" onClick={closeMenu}>
          Cart
          {cartItems?.length > 0 && (
            <span className="cart-badge">{cartItems.reduce((a, c) => a + c.qty, 0)}</span>
          )}
        </Link>
        {userInfo ? (
          <>
            <Link to="/profile" onClick={closeMenu}>{userInfo.name}</Link>
            {userInfo.isAdmin && <Link to="/admin/dashboard" onClick={closeMenu}>Admin</Link>}
            <button onClick={logoutHandler} className="btn btn-outline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>Login</Link>
            <Link to="/register" className="btn" onClick={closeMenu}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
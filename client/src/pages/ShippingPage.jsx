import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/slices/cartSlice";

const ShippingPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/placeorder");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Shipping</h1>
      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: "15px" }}>
          <label>Address</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>City</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Postal Code</label>
          <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Country</label>
          <input value={country} onChange={(e) => setCountry(e.target.value)} required style={{ width: "100%", padding: "8px" }} />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>Continue</button>
      </form>
    </div>
  );
};

export default ShippingPage;
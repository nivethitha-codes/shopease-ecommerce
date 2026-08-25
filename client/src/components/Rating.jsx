import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {value >= star ? (
            <FaStar color="#f8b400" />
          ) : value >= star - 0.5 ? (
            <FaStarHalfAlt color="#f8b400" />
          ) : (
            <FaRegStar color="#f8b400" />
          )}
        </span>
      ))}
      <span style={{ marginLeft: "5px", fontSize: "0.85rem" }}>{text}</span>
    </div>
  );
};

export default Rating;
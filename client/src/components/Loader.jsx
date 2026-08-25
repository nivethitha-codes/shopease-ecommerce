const Loader = ({ type = "text" }) => {
  if (type === "grid") {
    return (
      <div className="product-grid">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="skeleton" style={{ height: "260px" }} />
        ))}
      </div>
    );
  }
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h3>Loading...</h3>
    </div>
  );
};

export default Loader;
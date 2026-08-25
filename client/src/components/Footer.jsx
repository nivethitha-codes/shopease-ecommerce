const Footer = () => {
  return (
    <footer style={{
      marginTop: "50px",
      padding: "36px 48px",
      textAlign: "center",
      color: "#7f8c7c",
      fontSize: "0.85rem",
    }}>
      <p className="serif" style={{ fontSize: "1.1rem", marginBottom: "8px", color: "#f2f0e9" }}>Niyume</p>
      <p>© {new Date().getFullYear()} Niyume. All rights reserved.</p>
      <p style={{ marginTop: "6px" }}>Built with the MERN stack — MongoDB, Express, React, Node.js</p>
    </footer>
  );
};

export default Footer;
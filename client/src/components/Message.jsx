const Message = ({ variant = "info", children }) => {
  const colors = {
    info: "#cce5ff",
    danger: "#f8d7da",
    success: "#d4edda",
  };
  return (
    <div
      style={{
        padding: "15px",
        margin: "20px",
        backgroundColor: colors[variant],
        borderRadius: "5px",
        color: "#333",
      }}
    >
      {children}
    </div>
  );
};

export default Message;
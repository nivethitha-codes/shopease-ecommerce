const testimonials = [
  { quote: "The checkout process was seamless and my order arrived exactly as described. Great shopping experience overall.", who: "Aditi R.", role: "Verified Buyer" },
  { quote: "Loved how easy it was to track my order status from my profile. Clean, fast, and reliable.", who: "Karthik M.", role: "Verified Buyer" },
  { quote: "Great range of products and the admin support was quick to resolve my query.", who: "Sana P.", role: "Verified Buyer" },
];

const Testimonials = () => {
  return (
    <div className="container">
      <h2 className="section-title">What Our Customers Say</h2>
      <div className="testimonial-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card">
            <p className="quote">"{t.quote}"</p>
            <div className="who">{t.who}</div>
            <div className="role">{t.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
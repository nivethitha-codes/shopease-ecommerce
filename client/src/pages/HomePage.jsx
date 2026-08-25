import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productsApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

const testimonials = [
  { name: "Ananya R.", role: "Verified Buyer", text: "Delivery was fast and the product quality exceeded what I expected for the price." },
  { name: "Marcus T.", role: "Verified Buyer", text: "Clean checkout process, no surprises at payment. Will shop here again." },
  { name: "Priya S.", role: "Verified Buyer", text: "Loved the range of categories — found exactly what I was looking for in minutes." },
];

const HomePage = () => {
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(2000);

  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword, pageNumber });

  const categories = useMemo(() => {
    if (!data?.products) return [];
    return [...new Set(data.products.map((p) => p.category))];
  }, [data]);

  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];
    return data.products.filter(
      (p) => (category ? p.category === category : true) && p.price <= maxPrice
    );
  }, [data, category, maxPrice]);

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">New Collection</span>
          <h1 className="serif">Shop The Everyday Edit</h1>
          <p>Curated tech, kitchen, and lifestyle essentials — thoughtfully picked, honestly priced.</p>
          <a href="#shop" className="btn">Shop Now →</a>
          <div className="hero-stats">
            <div className="hero-stat">
              <h3 className="serif">{data?.products?.length || 15}+</h3>
              <p>Products</p>
            </div>
            <div className="hero-stat">
              <h3 className="serif">{categories.length || 6}</h3>
              <p>Categories</p>
            </div>
            <div className="hero-stat">
              <h3 className="serif">4.6★</h3>
              <p>Avg. Rating</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container" id="shop">
        <h2 className="section-title">Explore Our Categories</h2>
        <div className="pill-row">
          <button className={`pill ${category === "" ? "active" : ""}`} onClick={() => setCategory("")}>
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pill ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPageNumber(1);
          }}
          className="search-bar"
        />

        {isLoading ? (
          <Loader type="grid" />
        ) : isError ? (
          <Message variant="danger">{error?.data?.message || "Something went wrong"}</Message>
        ) : (
          <div className="shop-layout">
            <aside className="sidebar">
              <h4>Max Price: ${maxPrice}</h4>
              <input
                type="range"
                min="0"
                max="2000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-range"
              />
            </aside>

            {filteredProducts.length === 0 ? (
              <Message variant="info">No products match your filters</Message>
            ) : (
              <div className="product-grid fade-in">
                {filteredProducts.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {data?.pages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "34px" }}>
            {[...Array(data.pages).keys()].map((x) => (
              <button
                key={x + 1}
                onClick={() => setPageNumber(x + 1)}
                className={x + 1 === data.page ? "btn" : "btn btn-outline"}
              >
                {x + 1}
              </button>
            ))}
          </div>
        )}

        <div className="testimonials">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <p>"{t.text}"</p>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
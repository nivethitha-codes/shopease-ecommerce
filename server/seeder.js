import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import User from "./models/User.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const sampleProducts = [
  { name: "iPhone 16 Pro 128GB", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80", brand: "Apple", category: "Smartphones", description: "Latest flagship iPhone with A18 chip and titanium body.", price: 1130, countInStock: 12, rating: 4.8, numReviews: 24 },
  { name: "Coffee Machine", image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80", brand: "SMEG", category: "Kitchen", description: "Premium espresso machine with built-in grinder.", price: 985.99, countInStock: 5, rating: 5.0, numReviews: 10 },
  { name: "Wireless Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", brand: "Sony", category: "Electronics", description: "Noise-cancelling over-ear wireless headphones.", price: 249.99, countInStock: 20, rating: 4.6, numReviews: 45 },
  { name: "Samsung Galaxy S25", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80", brand: "Samsung", category: "Smartphones", description: "Flagship Android phone with 200MP camera.", price: 999, countInStock: 15, rating: 4.5, numReviews: 32 },
  { name: "Microwave Oven", image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500&q=80", brand: "LG", category: "Kitchen", description: "Compact 20L microwave with grill function.", price: 129, countInStock: 18, rating: 4.4, numReviews: 15 },
  { name: "Mechanical Keyboard", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80", brand: "Logitech", category: "Electronics", description: "RGB backlit mechanical gaming keyboard.", price: 89.99, countInStock: 30, rating: 4.7, numReviews: 60 },
  { name: "Running Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", brand: "Nike", category: "Footwear", description: "Lightweight running shoes with responsive cushioning.", price: 129.99, countInStock: 25, rating: 4.6, numReviews: 88 },
  { name: "Smart Watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", brand: "Apple", category: "Electronics", description: "Fitness and health tracking smartwatch.", price: 399, countInStock: 22, rating: 4.7, numReviews: 55 },
  { name: "Blender", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&q=80", brand: "KitchenAid", category: "Kitchen", description: "High-speed countertop blender for smoothies.", price: 79.99, countInStock: 14, rating: 4.3, numReviews: 20 },
  { name: "Leather Backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", brand: "Fossil", category: "Accessories", description: "Durable leather backpack with laptop compartment.", price: 149.99, countInStock: 10, rating: 4.5, numReviews: 18 },
  { name: "Wireless Mouse", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80", brand: "Logitech", category: "Electronics", description: "Ergonomic wireless mouse with silent clicks.", price: 39.99, countInStock: 40, rating: 4.4, numReviews: 70 },
  { name: "Air Fryer", image: "https://images.unsplash.com/photo-1648146988543-3212e88f1d38?w=500&q=80", brand: "Philips", category: "Kitchen", description: "5L digital air fryer with 8 preset programs.", price: 119.99, countInStock: 16, rating: 4.6, numReviews: 40 },
  { name: "Sunglasses", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80", brand: "Ray-Ban", category: "Accessories", description: "Classic UV-protection polarized sunglasses.", price: 159.99, countInStock: 20, rating: 4.5, numReviews: 33 },
  { name: "Gaming Laptop", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80", brand: "ASUS", category: "Electronics", description: "High-performance laptop for gaming and creators.", price: 1499, countInStock: 8, rating: 4.7, numReviews: 27 },
  { name: "Desk Lamp", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80", brand: "IKEA", category: "Home", description: "Adjustable LED desk lamp with USB charging port.", price: 34.99, countInStock: 35, rating: 4.2, numReviews: 12 },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    const adminUser = await User.findOne({ isAdmin: true });

    if (!adminUser) {
      console.log("No admin user found. Make your test user an admin first.");
      process.exit(1);
    }

    const productsWithUser = sampleProducts.map((p) => ({ ...p, user: adminUser._id }));
    await Product.insertMany(productsWithUser);

    console.log(`${productsWithUser.length} sample products imported!`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
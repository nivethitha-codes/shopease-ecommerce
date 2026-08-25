import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../redux/api/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const { data: product, isLoading, isError } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      toast.success("Product updated");
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || "Error updating product");
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="danger">Product not found</Message>;

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto" }}>
      <h1>Edit Product</h1>
      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: "12px" }}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>Image URL</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>Brand</label>
          <input value={brand} onChange={(e) => setBrand(e.target.value)} style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>Category</label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>Count In Stock</label>
          <input type="number" value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", padding: "8px" }} rows={4} />
        </div>
        <button type="submit" disabled={loadingUpdate} style={{ padding: "10px 20px" }}>
          Update
        </button>
      </form>
    </div>
  );
};

export default ProductEditPage;
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../redux/api/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const ProductListPage = () => {
  const { data, isLoading, isError, error, refetch } = useGetProductsQuery({});
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Create a new sample product?")) {
      try {
        await createProduct({
          name: "New Product",
          price: 0,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
          brand: "Sample Brand",
          category: "Sample Category",
          countInStock: 0,
          description: "Sample description",
        }).unwrap();
        toast.success("Product created — edit it to fill in real details");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || "Error creating product");
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || "Error deleting product");
      }
    }
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Products</h1>
        <button onClick={createProductHandler} disabled={loadingCreate} className="btn">
          + Create Product
        </button>
      </div>

      {isLoading || loadingDelete ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <table style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td style={{ display: "flex", gap: "10px" }}>
                  <Link to={`/admin/product/${product._id}/edit`}>Edit</Link>
                  <button onClick={() => deleteHandler(product._id)} className="btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductListPage;
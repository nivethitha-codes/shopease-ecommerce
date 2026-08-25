import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUsersQuery, useDeleteUserAdminMutation } from "../../redux/api/usersAdminApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const UserListPage = () => {
  const { data: users, isLoading, isError, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserAdminMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || "Error deleting user");
      }
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="danger">{error?.data?.message}</Message>;

  return (
    <div className="container">
      <h1>Users</h1>
      <table style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge ${user.isAdmin ? "badge-success" : "badge-danger"}`}>
                  {user.isAdmin ? "Yes" : "No"}
                </span>
              </td>
              <td style={{ display: "flex", gap: "10px" }}>
                <Link to={`/admin/user/${user._id}/edit`}>Edit</Link>
                {!user.isAdmin && (
                  <button onClick={() => deleteHandler(user._id)} className="btn-danger" style={{ border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer" }}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUsersQuery, useUpdateUserAdminMutation } from "../../redux/api/usersAdminApiSlice";
import Loader from "../../components/Loader";

const UserEditPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const { data: users, isLoading } = useGetUsersQuery();
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserAdminMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = users?.find((u) => u._id === userId);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [users, userId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin }).unwrap();
      toast.success("User updated");
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || "Error updating user");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="form-container">
      <h1>Edit User</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            style={{ width: "auto" }}
          />
          <label style={{ margin: 0 }}>Is Admin</label>
        </div>
        <button type="submit" disabled={loadingUpdate} className="btn">Update User</button>
      </form>
    </div>
  );
};

export default UserEditPage;
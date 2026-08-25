import User from "../models/User.js";

// @desc  Get all users (Admin)
// @route GET /api/users
export const getUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
};

// @desc  Delete a user (Admin)
// @route DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      return res.status(400).json({ message: "Cannot delete admin user" });
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc  Update a user (Admin)
// @route PUT /api/users/:id
export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin ?? user.isAdmin;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
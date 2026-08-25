import express from "express";
import { getUsers, deleteUser, updateUser } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getUsers);
router.route("/:id").put(protect, admin, updateUser).delete(protect, admin, deleteUser);

export default router;
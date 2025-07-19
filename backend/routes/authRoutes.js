import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/logout", logoutUser);

UserRouter.put("/update-user", authMiddleware, updateUser);

export default UserRouter;

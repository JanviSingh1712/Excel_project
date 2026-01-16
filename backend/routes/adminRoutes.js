import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getUsers } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", auth, getUsers);

export default router;

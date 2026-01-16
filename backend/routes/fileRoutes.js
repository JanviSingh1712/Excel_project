import express from "express";
import auth from "../middleware/authMiddleware.js";
import { processExcel, getHistory } from "../controllers/fileController.js";

const router = express.Router();

router.post("/process", auth, processExcel);
router.get("/history", auth, getHistory);

export default router;

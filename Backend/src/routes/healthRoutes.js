import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import { createHealthRecord, getHealthHistory, getTodayRecord, updateHealthHistory, deleteHealthRecord, getProfile, calculateStreak } from "../controllers/healthController.js"
import { getLeaderBoard } from "../controllers/leaderBoardController.js";

const router = express.Router();

router.post("/", authMiddleware, createHealthRecord);
router.get("/history", authMiddleware, getHealthHistory );
router.get("/today", authMiddleware, getTodayRecord);
router.put("/:id", authMiddleware, updateHealthHistory);
router.delete("/:id", authMiddleware, deleteHealthRecord);
router.get("/profile", authMiddleware, getProfile);
router.get("/streak", authMiddleware, calculateStreak);
router.get("/leaderboard", authMiddleware, getLeaderBoard);

export default router;
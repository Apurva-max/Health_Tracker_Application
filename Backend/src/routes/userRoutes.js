import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {

    res.json({
        message: "Protected Route",
        userId: req.user
    });
})

export default router;


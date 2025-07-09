import express from "express";
import {
    getAllStories,
    getStoryById,
    createStory,
    deleteStory,
    updateStory
} from "../controllers/storyController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllStories);
router.get("/:id", getStoryById);
router.post("/", authenticateToken, createStory);
router.delete("/:id", authenticateToken, deleteStory);
router.put("/:id", authenticateToken, updateStory); // opsional

export default router;

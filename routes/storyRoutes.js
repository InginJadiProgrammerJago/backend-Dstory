import express from "express";
import {
    getAllStories,
    getStoryById,
    createStory,
    deleteStory,
    updateStory
} from "../controllers/storyController.js";
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", getAllStories);
router.get("/:id", getStoryById);
router.post("/", authenticate, createStory);
router.delete("/:id", authenticate, deleteStory);
router.put("/:id", authenticate, updateStory); // opsional

export default router;

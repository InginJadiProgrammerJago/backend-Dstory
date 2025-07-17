import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoutes from './routes/uploadRoute.js';
import authRoutes from "./routes/authRoutes.js";
import storyRoutes from './routes/storyRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// Import Routes
app.use("/api", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/stories", storyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

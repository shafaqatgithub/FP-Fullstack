import express, { Router } from "express";
import { generateAccessAndRefreshToken } from "../controllers/userController.js";
import { upload } from "../middlewares/multerMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

// define routes here...

export default router;

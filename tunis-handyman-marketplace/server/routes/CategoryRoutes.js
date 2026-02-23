import express from "express";
import * as categoryController from "../controllers/CategoryController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", categoryController.getAllCategories);
router.get("/search", categoryController.searchCategories);
router.get("/:categoryId", categoryController.getCategoryById);
router.get("/gigs/:categoryName", categoryController.getGigsByCategory);

// Protected routes (require authentication)
router.post("/", verifyToken, categoryController.addCustomCategory);
router.delete(
  "/:categoryId",
  verifyToken,
  categoryController.deleteCustomCategory,
);

export default router;

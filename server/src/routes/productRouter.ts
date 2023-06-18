import express, { Router } from "express";
import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productController";
import { isAdmin, verifyToken } from "../middleware/authentication";

const router: Router = express.Router();

router.get("/", getAllProducts);

router.post("/", verifyToken, isAdmin, createProduct);

router.get("/:id", getProductById);

router.put("/:id", verifyToken, isAdmin, updateProduct);

router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;

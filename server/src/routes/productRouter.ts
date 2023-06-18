import express, { Router } from "express";
import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productController";

const router: Router = express.Router();

router.get("/products", getAllProducts);

router.post("/products", createProduct);

router.get("/products/:id", getProductById);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;

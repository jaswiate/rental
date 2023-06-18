import { Request, Response } from "express";
import { Product, ProductModel } from "../models/product";

// Get all products
async function getAllProducts(req: Request, res: Response) {
    try {
        const products: Product[] = await ProductModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while retrieving the products.",
        });
    }
}

// Create a new product
async function createProduct(req: Request, res: Response) {
    try {
        const { name, description, quantity, imageUrl } = req.body;

        const newProduct: Product = new ProductModel({
            name,
            description,
            quantity,
            imageUrl,
        });

        const savedProduct: Product = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred while creating the product.",
        });
    }
}

// Get a single product by ID
async function getProductById(req: Request, res: Response) {
    try {
        const productId: string = req.params.id;

        const product: Product | null = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while retrieving the product.",
        });
    }
}

// Update a product by ID
async function updateProduct(req: Request, res: Response) {
    try {
        const productId: string = req.params.id;
        const { name, description, quantity, imageUrl } = req.body;

        const updatedProduct: Product | null =
            await ProductModel.findByIdAndUpdate(
                productId,
                { name, description, quantity, imageUrl },
                { new: true }
            );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found." });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while updating the product.",
        });
    }
}

// Delete a product by ID
async function deleteProduct(req: Request, res: Response) {
    try {
        const productId: string = req.params.id;

        const deletedProduct: Product | null =
            await ProductModel.findByIdAndRemove(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found." });
        }

        res.json({ message: "Product deleted successfully." });
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while deleting the product.",
        });
    }
}

export {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};

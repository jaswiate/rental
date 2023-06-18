import { Document, Schema, model } from "mongoose";

interface Product extends Document {
    _id: string;
    name: string;
    description?: string;
    quantity: number;
    imageUrl?: string;
}

const productSchema = new Schema<Product>({
    name: { type: String, required: true },
    description: { type: String, required: false },
    quantity: { type: Number, required: true },
    imageUrl: {
        type: String,
        required: false,
    },
});

const ProductModel = model<Product>("Product", productSchema);

export { Product, ProductModel };

import mongoose, { Document, Schema, model } from "mongoose";

interface Rental extends Document {
    _id: string;
    clientId: string;
    borrowDate: Date;
    dueDate: Date;
    ifProlonged?: boolean;
}

const productSchema = new Schema<Product>({
    clientId: { type: String, required: true },
    borrowDate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const ProductModel = model<Product>("Product", productSchema);

export { Product, ProductModel };

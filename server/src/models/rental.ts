import { Document, Schema, model } from "mongoose";

interface Rental extends Document {
    _id: string;
    clientId: Schema.Types.ObjectId;
    productId: Schema.Types.ObjectId;
    quantity?: number;
    borrowDate: Date;
    dueDate: Date;
    fine?: number;
    ifProlonged?: boolean;
}

const rentalSchema = new Schema<Rental>({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: { type: Number, default: 1 },
    borrowDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    fine: { type: Number, default: 0 },
    ifProlonged: { type: Boolean, default: false },
});

const RentalModel = model<Rental>("Rental", rentalSchema);

export { Rental, RentalModel };

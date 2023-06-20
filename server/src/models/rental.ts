import { Document, Schema, model } from "mongoose";

interface Rental extends Document {
    _id: string;
    clientId: Schema.Types.ObjectId;
    productId: Schema.Types.ObjectId;
    quantity: number;
    isPending: boolean;
    borrowDate?: Date;
    dueDate?: Date;
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
    quantity: { type: Number, required: true },
    isPending: { type: Boolean, required: true },
    borrowDate: { type: Date, required: false },
    dueDate: { type: Date, required: false },
    fine: { type: Number, default: 0 },
    ifProlonged: { type: Boolean, default: false },
});

const RentalModel = model<Rental>("Rental", rentalSchema);

export { Rental, RentalModel };

import { Request, Response } from "express";
import { Rental, RentalModel } from "../models/rental";
import { ProductModel } from "../models/product";

async function getAllRentals(req: Request, res: Response) {
    try {
        const rentals: Rental[] = await RentalModel.find();
        res.json(rentals);
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while retrieving the rentals.",
        });
    }
}

async function getPendingRentals(req: Request, res: Response) {
    try {
        const rentals: Rental[] = await RentalModel.find({ isPending: true });
        res.json(rentals);
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while retrieving the pending rentals.",
        });
    }
}

async function getRentalById(req: Request, res: Response) {
    try {
        const rentalId: string = req.params.id;

        const rental: Rental | null = await RentalModel.findById(rentalId);

        if (!rental) {
            return res.status(404).json({ error: "Rental not found." });
        }

        res.json(rental);
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while retrieving the rental.",
        });
    }
}

async function createRental(req: Request, res: Response) {
    try {
        const {
            clientId,
            productId,
            quantity,
            isPending,
            borrowDate,
            dueDate,
        }: Rental = req.body;

        // Check if the product has the desired quantity
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }

        if (product.quantity < quantity) {
            return res.status(400).json({
                error: "Insufficient quantity available for the product.",
            });
        }

        const productName = product.name;
        const newRental: Rental = new RentalModel({
            clientId,
            productId,
            productName,
            quantity,
            isPending,
            borrowDate,
            dueDate,
        });

        // Update the quantity of the product
        await ProductModel.findByIdAndUpdate(productId, {
            $inc: { quantity: -quantity },
        });

        const savedRental: Rental = await newRental.save();
        res.status(201).json(savedRental);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "An error occurred while creating the rental.",
        });
    }
}

// this version only updates the fields we update during confirming shipment
async function updateRental(req: Request, res: Response) {
    try {
        const rentalId: string = req.params.id;
        const { isPending, borrowDate, dueDate }: Rental = req.body;

        const updatedRental: Rental | null =
            await RentalModel.findByIdAndUpdate(
                rentalId,
                {
                    isPending,
                    borrowDate,
                    dueDate,
                },
                { new: true }
            );
        console.log(updatedRental);
        if (!updatedRental) {
            return res.status(404).json({ error: "Rental not found." });
        }

        res.json(updatedRental);
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while updating the rental.",
        });
    }
}
// async function updateRental(req: Request, res: Response) {
//     try {
//         const rentalId: string = req.params.id;
//         const {
//             clientId,
//             productId,
//             quantity,
//             isPending,
//             borrowDate,
//             dueDate,
//             fine,
//             ifProlonged,
//         }: Rental = req.body;

//         // these lines aren't currently necessary, because we don't update the quantity of products when updating renttal
//         // we also don't change the product name using this route for now
//         /*         // Check if the product has the desired quantity
//         const product = await ProductModel.findById(productId);
//         if (!product) {
//             return res.status(404).json({ error: "Product not found." });
//         }

//         if (product.quantity < quantity) {
//             return res.status(400).json({
//                 error: "Insufficient quantity available for the product.",
//             });
//         } */

//         const updatedRental: Rental | null =
//             await RentalModel.findByIdAndUpdate(
//                 rentalId,
//                 {
//                     clientId,
//                     productId,
//                     quantity,
//                     isPending,
//                     borrowDate,
//                     dueDate,
//                     fine,
//                     ifProlonged,
//                 },
//                 { new: true }
//             );
//         console.log(updatedRental);
//         if (!updatedRental) {
//             return res.status(404).json({ error: "Rental not found." });
//         }
//         /*
//         // Update the quantity of the product
//         await ProductModel.findByIdAndUpdate(productId, {
//             $inc: { quantity: -quantity },
//         }); */

//         res.json(updatedRental);
//     } catch (error) {
//         res.status(500).json({
//             error: "An error occurred while updating the rental.",
//         });
//     }
// }

async function deleteRental(req: Request, res: Response) {
    try {
        const rentalId: string = req.params.id;

        const rental = await RentalModel.findById(rentalId);
        if (!rental) {
            return res.status(404).json({ error: "Rental not found." });
        }

        const { productId, quantity } = rental;

        await RentalModel.findByIdAndDelete(rentalId);

        await ProductModel.findByIdAndUpdate(productId, { $inc: { quantity } });

        res.json({ message: "Rental deleted successfully." });
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while deleting the rental.",
        });
    }
}

export {
    getAllRentals,
    getPendingRentals,
    createRental,
    getRentalById,
    updateRental,
    deleteRental,
};

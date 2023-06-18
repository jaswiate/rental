import express from "express";
import {
    getAllRentals,
    getRentalById,
    createRental,
    updateRental,
    deleteRental,
} from "../controllers/rentalController";

const router = express.Router();

router.get("/", getAllRentals);
router.get("/:id", getRentalById);
router.post("/", createRental);
router.put("/:id", updateRental);
router.delete("/:id", deleteRental);

export default router;

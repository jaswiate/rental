import express from "express";
import {
    getAllRentals,
    getRentalById,
    createRental,
    updateRental,
    deleteRental,
} from "../controllers/rentalController";
import { isAdmin } from "../middleware/authentication";

const router = express.Router();

router.get("/", getAllRentals);
router.get("/:id", getRentalById);
router.post("/", createRental);
router.put("/:id", isAdmin, updateRental);
router.delete("/:id", isAdmin, deleteRental);

export default router;
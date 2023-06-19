import express from "express";
import {
    getAllRentals,
    getRentalById,
    createRental,
    updateRental,
    deleteRental,
} from "../controllers/rentalController";
import { isAdmin } from "../middleware/authentication";
import { calculateFines } from "../utils/finesUtils";

const router = express.Router();

router.get("/", isAdmin, getAllRentals);
router.get("/:id", isAdmin, getRentalById);
router.post("/", createRental);
router.put("/:id", isAdmin, updateRental);
router.delete("/:id", isAdmin, deleteRental);
router.get("/fines", isAdmin, calculateFines);

export default router;

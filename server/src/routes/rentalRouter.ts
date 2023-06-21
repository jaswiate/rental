import express from "express";
import {
    getAllRentals,
    getRentalById,
    createRental,
    updateRental,
    deleteRental,
    getPendingRentals,
} from "../controllers/rentalController";
import { isAdmin } from "../middleware/authentication";
import { finesMiddleware } from "../middleware/finesCalculation";

const router = express.Router();
router.get("/", isAdmin, getAllRentals);
router.get("/fines", isAdmin, finesMiddleware);
router.get("/pending", isAdmin, getPendingRentals);
router.get("/:id", isAdmin, getRentalById);
router.post("/", createRental);
router.put("/:id", updateRental);
router.delete("/:id", isAdmin, deleteRental);

export default router;

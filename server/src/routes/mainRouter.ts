import { Router } from "express";
import userRouter from "./userRouter";
import productRouter from "./productRouter";
import rentalRouter from "./rentalRouter";
import { verifyToken } from "../middleware/authentication";

const mainRouter: Router = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/rentals", rentalRouter, verifyToken);

export default mainRouter;

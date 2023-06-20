import { NextFunction, Request, Response } from "express";
import { calculateFines } from "../utils/finesUtils";

export const finesMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await calculateFines();
    res.send(200);
};

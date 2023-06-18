import { User, UserModel } from "../models/user";
import { hashSync, compareSync } from "bcryptjs";
import { verify, sign, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { tokenPayload } from "../types/interfaces";
dotenv.config();
const secretKey: Secret = process.env.SECRET_KEY!;

const checkDuplicateUsername = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const existingUser = await UserModel.findOne({
            username: req.body.username,
        });

        if (existingUser) {
            return res.status(400).send({
                message: "Failed! Username is already in use!",
            });
        }

        next();
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.get("x-access-token");

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    try {
        verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            }
            req.body.userId = (decoded as tokenPayload).id;
            next();
        });
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    // check if user is signed in and has the correct role
    const { userId } = req.body;
    const user: User | null = await UserModel.findOne({ userId });
    if (user && user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Unauthorized" });
    }
};

export { checkDuplicateUsername, verifyToken, isAdmin };

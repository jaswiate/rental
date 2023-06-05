import { User, UserModel } from "../models/user";
import { hashSync, compareSync } from "bcryptjs";
import { verify, sign, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();
const secretKey: Secret = process.env.SECRET_KEY!;

interface tokenPayload {
    id: string;
}

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
            req.body.userId = (<tokenPayload>decoded).id;
            next();
        });
    } catch (error) {}
};

const signup = async (req: Request, res: Response) => {
    try {
        const user = new UserModel({
            username: req.body.username,
            password: hashSync(req.body.password, 8),
        });
        await user.save();
        res.send({
            message: "User was registered successfully!",
        });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User | null = await UserModel.findOne({
            username: req.body.username,
        });
        if (!user) return res.status(404).send({ message: "User Not found." });

        const passwordIsValid = compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }

        /*         const token = sign(user, secretKey, {
            expiresIn: 86400, // 24 hours
        });
 */
        const payload: tokenPayload = { id: user._id };
        const token = sign(payload, secretKey, {
            expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
            id: user._id,
            username: user.username,
            accessToken: token,
        });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

export { checkDuplicateUsername, verifyToken, signin, signup };

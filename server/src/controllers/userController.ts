import { NextFunction, Request, Response } from "express";
import { User, UserModel } from "../models/user";
import { compareSync, hashSync } from "bcryptjs";
import { Secret, sign } from "jsonwebtoken";
import { tokenPayload } from "../types/interfaces";
import * as dotenv from "dotenv";
import { Rental, RentalModel } from "../models/rental";

dotenv.config();
const secretKey: Secret = process.env.SECRET_KEY!;

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
    const { username, password } = req.body;

    try {
        const user: User | null = await UserModel.findOne({
            username: username,
        });
        if (!user) return res.status(404).json({ message: "User Not found." });

        const passwordIsValid = compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({
                message: "Invalid Password!",
            });
        }

        /*         const token = sign(user, secretKey, {
            expiresIn: 86400, // 24 hours
        });
 */
        // const token: string = sign(
        //     { id: user._id, username: user.username, role: user.role },
        //     "your-secret-key"
        // );

        // res.json({ token, user });
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

async function getUserRentals(req: Request, res: Response) {
    try {
        const { userId } = req.body;
        console.log(userId);
        const rentals: Rental[] = await RentalModel.find({ clientId: userId });
        console.log(JSON.stringify(rentals));
        res.json(rentals);
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while retrieving the rental.",
        });
    }
}
export { signup, signin, getUserRentals };

import { Router, Request, Response } from "express";
const {
    checkDuplicateUsername,
    verifyToken,
    signin,
    signup,
} = require("../middleware/authentication");
const router = Router();

router.get("/", (req: Request, res: Response) => {
    console.log("auth works");
});

router.post("/signup", checkDuplicateUsername, signup);
router.post("/signin", signin);

//check user token
router.get("/user", verifyToken, (req: Request, res: Response) => {
    res.status(200).send("User Content.");
});

export default router;

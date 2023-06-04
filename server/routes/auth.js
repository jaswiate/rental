const router = require("express").Router();
const {
    checkDuplicateUsername,
    verifyToken,
    signin,
    signup,
} = require("../middlewares/authentication");

router.get("/", (req, res) => {
    console.log("auth works");
});

router.post("/signup", checkDuplicateUsername, signup);
router.post("/signin", signin);

//check user token
router.get("/user", verifyToken, (req, res) => {
    res.status(200).send("User Content.");
});

module.exports = router;

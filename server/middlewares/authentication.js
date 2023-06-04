const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

checkDuplicateUsername = (req, res, next) => {
    User.findOne({
        username: req.body.username,
    })
        .then(next(), () => {
            return res.status(400).send({
                message: "Failed! Username is already in use!",
            });
        })
        .catch((err) => res.status(500).send({ message: err }));
};

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    user.save()
        .then((savedUser) =>
            res.send({
                message: "User was registered successfully!",
            })
        )
        .catch((err) => res.status(500).send({ message: err }));
};

signin = (req, res) => {
    User.findOne({
        username: req.body.username,
    })
        .then(
            (user) => {
                const token = jwt.sign({ id: user.id }, secretKey.secret, {
                    expiresIn: 86400, // 24 hours
                });

                res.status(200).send({
                    id: user._id,
                    username: user.username,
                    accessToken: token,
                });
            },
            (user, err) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }
                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }

                const passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!",
                    });
                }
            }
        )
        .catch((err) => res.status(500).send({ message: err }));
};

module.exports = {
    checkDuplicateUsername,
    verifyToken,
    signin,
    signup,
};

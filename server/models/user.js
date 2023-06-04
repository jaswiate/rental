const mongoose = require("mongoose");

//sets stores set IDs
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        password: String,
    })
);

module.exports = { User };

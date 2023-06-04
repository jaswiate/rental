const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/auth");

// DB setup
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.error(error));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to database");
});

//Express setup
const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>GR GR GR</h1>");
});
app.use("/auth", userRouter);

// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log("The application is available on port 3000");
});

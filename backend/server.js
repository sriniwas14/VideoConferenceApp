require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("./utils/mongo");

// Routes
const usersRouter = require("./routes/users");

const authChecker = require("./middlewares/authChecker");

const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());

app.use("/auth/users", usersRouter);

app.listen(port, () => console.log("Server Started on Port", port));

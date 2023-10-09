require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("./utils/mongo");

// Routes
const usersRouter = require("./routes/users");
const sessionsRouter = require("./routes/sessions");

const authChecker = require("./middlewares/authChecker");

const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/auth/users", usersRouter);
app.use("/sessions", authChecker, sessionsRouter);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log("Server Started on Port", port));

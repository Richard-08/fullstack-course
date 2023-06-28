const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const errorHandler = require("./middleware/errorHandler");

const config = require("./utils/config");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGODB_URI);

const app = express();

app.use(cors());
app.use(morgan("combined"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(errorHandler);

module.exports = app;

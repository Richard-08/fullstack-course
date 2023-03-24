const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const errorHandler = require("./middleware/errorHandler");

const config = require("./utils/config");

const blogsRouter = require("./controllers/blogs");

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGODB_URI);

const app = express();

app.use(cors());
app.use(morgan("combined"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use(errorHandler);

module.exports = app;

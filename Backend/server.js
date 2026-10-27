const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const eventosRouter = require("./routes/eventosRoutes");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get(`/`, (req, res) => {
  res.status(200).send(`Hola Express`);
});

app.use("/api", eventosRouter);

module.exports = app;

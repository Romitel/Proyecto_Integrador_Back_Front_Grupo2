require(`dotenv`).config();

const express = require("express");

const HOSTNAME = "127.0.0.1";
const PORT = 3000;

const app = express();

app.get(`/`, (req, res) => {
  res.status(200).send(`Hola Express`);
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`el servidor esta corriendo en http://${HOSTNAME}:${PORT}`);
});

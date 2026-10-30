require(`dotenv`).config();

const express = require('express');

const app = express();

const HOSTNAME = '127.0.0.1';

const PORT = 3000;

app.get(`/`, (req, res) => {});

app.listen(PORT, HOSTNAME, () => {
  console.log(`el servidor esta corriendo en http://${HOSTNAME}:${PORT}`);
});

const express = require('express');
const path = require('path');
const compression = require('compression');
const sudokuGenerator = require('../components/sudokuGenerator');
const db = require('../db/db');

const port = 3000;

const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/newPuzzle', (req, res) => {
  const newPuzzle = sudokuGenerator();
  db.addPuzzle(newPuzzle, (data) => {
    res.send(data);
  });
});

app.get('/puzzleSol', (req, res) => {
  db.getSolution(req.data.id, (data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`listening on port localhost:${port}`);
});
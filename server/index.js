const express = require('express');
const path = require('path');
const compression = require('compression');
const sudokuGenerator = require('./components/sudokuGenerator');
const db = require('../db/db');

const port = 3000;

const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/puzzle', (req, res) => {
  const newPuzzle = sudokuGenerator();
  db.addPuzzle(newPuzzle, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port localhost:${port}`);
});
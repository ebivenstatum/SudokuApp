const express = require('express');
const path = require('path');
const compression = require('compression');

const sudokuGenerator = require('../components/sudokuGenerator');
const solutionChecker = require('../components/solutionChecker');

const port = 3000;

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());

app.get('/newPuzzle', (req, res) => {
  const newPuzzle = sudokuGenerator();
  res.send(newPuzzle);
});

app.post('/puzzleSol', (req, res) => {
  const status = solutionChecker(req.body.puzzle);
  res.send({solved: status});
});

app.listen(port, () => {
  console.log(`listening on port localhost:${port}`);
});
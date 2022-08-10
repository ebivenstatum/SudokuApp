const express = require('express');
const path = require('path');
const compression = require('compression');
const sudokuGenerator = require('../components/sudokuGenerator');
const puzzleGenerator = require('../components/puzzleGenerator');
const db = require('../db/db');

const port = 3000;

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());

app.get('/newPuzzle', (req, res) => {
  const puzzleSol = sudokuGenerator();
  const newPuzzle = puzzleGenerator(puzzleSol);

  db.addPuzzle({id: req.params.id, puzzle: newPuzzle, solution: puzzleSol}, (data) => {
    res.send(data);
  });

});

app.post('/puzzleSol', (req, res) => {

    db.getSolution(req.body.id, (data) => {

      let errors = 0;
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (data[i][j] !== req.body.puzzle[i][j]) {
            errors++;
          }
        }
      }
      if (errors === 0) {
        res.send('Valid');
      } else {
        res.send('Invalid')
      }

  });

});

app.listen(port, () => {
  console.log(`listening on port localhost:${port}`);
});
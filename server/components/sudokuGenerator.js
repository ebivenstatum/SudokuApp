const sudokuGenerator = () => {

  // generates a random index between 0 and 8
  const randomVal = () => {
    const rand = Math.floor(Math.random() * 9);
    return rand;
  };

  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // all possible cell values

  // helper function
  const subgridFinder = (i, j, currentBoard) => {
    const subgrid = [];
    å
    if (i % 3 === 0) {

      if (j % 3 === 0) {
        subgrid.push(currentBoard[i].slice(j, j + 3));
        subgrid.push(currentBoard[i + 1].slice(j, j + 3));
        subgrid.push(currentBoard[i + 2].slice(j, j + 3));
      } else if (j % 3 === 1) {
        subgrid.push(currentBoard[i].slice(j - 1, j + 2));
        subgrid.push(currentBoard[i + 1].slice(j - 1, j + 2));
        subgrid.push(currentBoard[i + 1].slice(j - 1, j + 2));
      } else {
        subgrid.push(currentBoard[i].slice(j - 2, j + 1));
        subgrid.push(currentBoard[i + 1].slice(j - 2, j + 1));
        subgrid.push(currentBoard[i + 2].slice(j - 2, j + 1));
      }

    } else if (i % 3 === 1) {

      if (j % 3 === 0) {
        subgrid.push(currentBoard[i - 1].slice(j, j + 3));
        subgrid.push(currentBoard[i].slice(j, j + 3));
        subgrid.push(currentBoard[i + 1].slice(j, j + 3));
      } else if (j % 3 === 1) {
        subgrid.push(currentBoard[i - 1].slice(j - 1, j + 2));
        subgrid.push(currentBoard[i].slice(j - 1, j + 2));
        subgrid.push(currentBoard[i + 1].slice(j - 1, j + 2));
      } else {
        subgrid.push(currentBoard[i - 1].slice(j - 2, j + 1));
        subgrid.push(currentBoard[i].slice(j - 2, j + 1));
        subgrid.push(currentBoard[i + 1].slice(j - 2, j + 1));
      }

    } else {

      if (j % 3 === 0) {
        subgrid.push(currentBoard[i - 2].slice(j, j + 3));
        subgrid.push(currentBoard[i - 1].slice(j, j + 3));
        subgrid.push(currentBoard[i].slice(j, j + 3));
      } else if (j % 3 === 1) {
        subgrid.push(currentBoard[i - 2].slice(j - 1, j + 2));
        subgrid.push(currentBoard[i - 1].slice(j - 1, j + 2));
        subgrid.push(currentBoard[i].slice(j - 1, j + 2));
      } else {
        subgrid.push(currentBoard[i - 2].slice(j - 2, j + 1));
        subgrid.push(currentBoard[i - 1].slice(j - 2, j + 1));
        subgrid.push(currentBoard[i].slice(j - 2, j + 1));
      }

    }

    return subgrid;
  }

  // Board
  const b = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  // Fill Diagonal Subgrids
  const diagonalGenerator = (board) => {
    let currentBoard = board;
    for (let m = 0; m <= 6; m += 3) {
      const n = m;
      const usedVals = [];

      for (let i = m; i < m + 3; i++) {
        for (let j = n; j < n + 3; j++) {

          let rand = randomVal();
          while (usedVals.includes(values[rand])) {
            rand = randomVal();
          }
          currentBoard[i][j] = values[rand];

          usedVals.push(values[rand]);

        }
      }

    }

    return currentBoard;
  };

  // Fill the rest of the subgrids
  const gridFiller = (board) => {
    let currentBoard = board;

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {


        if (currentBoard[x][y] === 0) {

          const row = currentBoard[x];
          const col = [];
          for (let l = 0; l < 9; l++) {
            col.push(currentBoard[l][y]);
          }

          let subgrid = subgridFinder(x, y, currentBoard);
          subgrid = subgrid[0].concat(subgrid[1].concat(subgrid[2]));

          for (let k = 1; k <= 9; k++) {

            if (!row.includes(k) && !col.includes(k) && !subgrid.includes(k)) {
              currentBoard[x][y] = k;
              break;
            }

          }

        }

      }
    }

    return currentBoard;
  }

  // make puzzle function
  const makePuzzle = (board, solution) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let rand = (Math.floor(Math.random() * 100)).toString();
        if (rand[0] <= 2) {
          board[i][j] = solution[i][j];
        }
      }
    }
    return board;
  };

  const blankBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const diagonals = diagonalGenerator(b);
  const solutionBoard = gridFiller(diagonals);
  const puzzleBoard = makePuzzle(blankBoard, solutionBoard);

  return { puzzle: puzzleBoard, solution: solutionBoard };
}

export default sudokuGenerator;
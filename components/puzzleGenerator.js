const puzzleGenerator = (board) => {
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

  const makePuzzle = (solution) => {
    let newBoard = blankBoard;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let rand = (Math.floor(Math.random() * 100)).toString();

        if (rand[0] <= 2) {
          newBoard[i][j] = solution[i][j];
        }

      }
    }

    return newBoard;
  };

  const puzzleBoard = makePuzzle(board);

  return puzzleBoard;
};

module.exports = puzzleGenerator;
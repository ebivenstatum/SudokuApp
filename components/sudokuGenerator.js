const sudokuGenerator = () => {

  const defaultBoard = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],

    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],

    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, 7, 8],
  ];

  const boards = [defaultBoard];

  const randomVal = () => {
    const rand = Math.floor(Math.random() * 9);
    return rand;
  };

  const rotateBoard = (board) => {
    let output = [];

    for (let i = 0; i < 9; i++) {
      let newRow = [];
      for (let j = 8; j >= 0; j--) {
        newRow.push(board[j][i]);
      }
      output.push(newRow);
    }

    return output;
  };

  const rotateBoards = (boardList) => {
    boardList.forEach(board => {
      let newBoard1 = rotateBoard(board);
      let newBoard2 = rotateBoard(newBoard1);
      let newBoard3 = rotateBoard(newBoard2);
      boards.push(newBoard1);
      boards.push(newBoard2);
      boards.push(newBoard3);
    });
  };

  const swapValue = (board, value) => {

    const oldVal = board[0][0];
    const diff = value - oldVal;
    const newBoard = [[], [], [], [], [], [], [], [], []];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] + diff <= 9) {
          newBoard[i][j] = board[i][j] + diff;
        } else {
          newBoard[i][j] = board[i][j] + diff - 9;
        }
      }
    }

    return newBoard;
  };

  const swapValues = (board) => {
    for (let i = 2; i <= 9; i++) {
      const newBoard = swapValue(board, i);
      boards.push(newBoard);
    }
  };

  swapValues(defaultBoard);
  rotateBoards(boards);

  let ind = Math.floor(Math.random() * 36);
  return boards[ind];
};

module.exports = sudokuGenerator;
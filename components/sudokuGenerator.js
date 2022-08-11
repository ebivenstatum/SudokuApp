const defaultBoards = [
  [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, 7, 8],
  ],
  [
    [1, 4, 7, 2, 5, 8, 3, 6, 9],
    [2, 5, 8, 3, 6, 9, 1, 4, 7],
    [3, 6, 9, 1, 4, 7, 2, 5, 8],
    [7, 1, 4, 8, 2, 5, 9, 3, 6],
    [8, 2, 5, 9, 3, 6, 7, 1, 4],
    [9, 3, 6, 7, 1, 4, 8, 2, 5],
    [4, 7, 1, 5, 8, 2, 6, 9, 3],
    [5, 8, 2, 6, 9, 3, 4, 7, 1],
    [6, 9, 3, 4, 7, 1, 5, 8, 2],
  ],
  [
    [1, 5, 8, 9, 2, 6, 4, 3, 7],
    [9, 3, 6, 8, 4, 7, 1, 5, 2],
    [2, 7, 4, 5, 1, 3, 8, 9, 6],
    [6, 9, 5, 4, 3, 1, 7, 2, 8],
    [8, 2, 7, 6, 9, 5, 3, 1, 4],
    [4, 1, 3, 2, 7, 8, 5, 6, 9],
    [3, 6, 9, 7, 5, 4, 2, 8, 1],
    [7, 8, 1, 3, 6, 2, 9, 4, 5],
    [5, 4, 2, 1, 8, 9, 6, 7, 3],
  ],
  [
    [1, 8, 6, 3, 4, 9, 2, 5, 7],
    [5, 3, 7, 2, 8, 1, 4, 6, 9],
    [9, 4, 2, 6, 5, 7, 3, 1, 8],
    [4, 6, 3, 7, 9, 2, 1, 8, 5],
    [7, 1, 5, 8, 6, 4, 9, 3, 2],
    [8, 2, 9, 5, 1, 3, 7, 4, 6],
    [6, 9, 1, 4, 2, 8, 5, 7, 3],
    [2, 7, 8, 1, 3, 5, 6, 9, 4],
    [3, 5, 4, 9, 7, 6, 8, 2, 1],
  ]
];

const sudokuGenerator = () => {

  let ind = Math.floor(Math.random() * defaultBoards.length);
  const boards = [];

  boards.push(defaultBoards[ind]);

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

  const swapValues = (boardsList) => {
    boardsList.forEach(board => {
      for (let i = 2; i <= 9; i++) {
        const newBoard = swapValue(board, i);
        boards.push(newBoard);
      }
    });
  };

  swapValues(defaultBoards);
  rotateBoards(boards);
  // console.log(boards);

  ind = Math.floor(Math.random() * 36);
  return boards[ind];
};

module.exports = sudokuGenerator;
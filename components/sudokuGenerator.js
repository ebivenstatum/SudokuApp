import premadeBoards from './premadeBoards';
import puzzleGenerator from './puzzleGenerator';

const sudokuGenerator = () => {

  let ind = Math.floor(Math.random() * premadeBoards.length);
  const boards = [];

  boards.push(premadeBoards[ind]);

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

  swapValues(premadeBoards);
  rotateBoards(boards);

  ind = Math.floor(Math.random() * 36);
  const solBoard = boards[ind];
  const puzzle = puzzleGenerator(solBoard);

  return puzzle;
};

module.exports = sudokuGenerator;
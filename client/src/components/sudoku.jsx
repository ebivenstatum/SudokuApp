import React, { useState } from 'react';
import axios from 'axios';

// Need a 9x9 grid, with 3x3 subgrids

// generator function and checker function on server
// genreator function also returns the number of the board

function Sudoku() {

  const [sudokuBoard, setSudokuBoard] = useState([]);
  const [boardId, setBoardId] = useState({});

  const sudokuFetcher = () => {
    // make axios request for a sudoku
    // the set sudokuBoard to the fetched board
    const config = {
      method: "GET",
      url: "http://localhost:3000/newPuzzle"
    }
    axios(config)
      .then((res) => {
        setSudokuBoard(res.data.puzzle);
        setBoardId(res.data.id);
      })
      .catch(err => console.log(err));

  };

  const sudokuChecker = (board) => {
    // checks db for board solution
    // for each cell, check if they match
    const config = {
      method: "GET",
      url: "http://localhost:3000/puzzleSol",
      data: { boardId, sudokuBoard }
    }
    axios(config)
      .then((res) => {
      })
      .catch(err => console.log(err));
  };

  const makeBoardComponent = (inputBoard) => {
    const component = [];
    let key = 1;

    inputBoard.forEach(row => {
      row.forEach(cell => {
        if(cell === 0) {
        component.push(<input className="notFilled" key={key} value={null} />);
        key++;
      } else {
        component.push(<input className="preFilled" key={key} value={cell} />);
        key++;
      }
    });
  });

  return component;
};

if (sudokuBoard.length === 0) {
  sudokuFetcher();
}

const boardComponent = makeBoardComponent(sudokuBoard);

return (
  <div>
    <h3 className="boardNumber">#1</h3>
    <div className="boardContainer">
      {boardComponent}
    </div>
  </div>
)

};

export default Sudoku;

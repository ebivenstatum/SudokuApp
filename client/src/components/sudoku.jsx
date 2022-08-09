import React, { useState } from 'react';
import axios from 'axios';

// Need a 9x9 grid, with 3x3 subgrids

// generator function and checker function on server
// genreator function also returns the number of the board

function Sudoku() {

  const [sudokuBoard, setSudokuBoard] = useState([]);

  const cell = 9

  let tempBoard = [
    [cell, cell, cell, cell, cell, cell, cell, cell, cell],
    [cell, cell, cell, cell, cell, cell, cell, cell, cell],
    [cell, cell, cell, cell, cell, cell, cell, cell, cell],
    [cell, cell, cell, cell, cell, cell, cell, cell, cell],
    [cell, cell, cell, cell, cell, cell, cell, cell, cell],
    [cell, cell, cell, cell, cell, cell, cell, cell, cell],
    [cell, cell, cell, cell, cell, cell, cell, cell, cell],
    [cell, cell, cell, cell, cell, cell, cell, cell, cell],
    [cell, cell, cell, cell, cell, cell, cell, cell, cell],
  ];

  const sudokuFetcher = () => {
    // make axios request for a sudoku
    // the set sudokuBoard to the fetched board
  };

  const sudokuChecker = (board) => {
    // checks db for board solution
    // for each cell, check if they match
  };

  return (
    <div>
      <h3 className="boardNumber">#1</h3>
      <div className="boardContainer">
        {tempBoard}
      </div>
    </div>
  )

};

export default Sudoku;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Need a 9x9 grid, with 3x3 subgrids

// generator function and checker function on server
// genreator function also returns the number of the board

function Sudoku() {

  const [sudokuBoard, setSudokuBoard] = useState([]);
  const [boardId, setBoardId] = useState({});
  const [boardComponent, setBoardComponent] = useState([]);

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

  const handleChange = (event) => {
    console.log(event.target.id);

  };

  const makeBoardComponent = (inputBoard) => {
    const component = [];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const key = `${i}${j}`
        if (inputBoard[i][j] === 0) {
          component.push(<input className="notFilled" key={key} id={key} value={null} onChange={handleChange} />);
        } else {
          component.push(<input className="preFilled" key={key} id={key} value={inputBoard[i][j]} disabled />);
        }
      }
    }

    return component;
  };

  useEffect(() => {
    if (sudokuBoard.length === 0) {
      sudokuFetcher();
    }
  })

  useEffect(() => {
    if (sudokuBoard.length > 0) {
      setBoardComponent(makeBoardComponent(sudokuBoard));
    }
  }, [sudokuBoard])

  if (boardComponent !== undefined) {
    return (
      <div>
        <div className="boardContainer">
          {boardComponent}
        </div>
      </div>
    )
  }



};

export default Sudoku;

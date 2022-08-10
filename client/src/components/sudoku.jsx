import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Need a 9x9 grid, with 3x3 subgrids

// generator function and checker function on server
// genreator function also returns the number of the board

function Sudoku() {

  const [sudokuBoard, setSudokuBoard] = useState([]);
  const [boardId, setBoardId] = useState({});
  const [boardComponent, setBoardComponent] = useState([]);
  const [preFilled, setPreFilled] = useState([]);
  const [filledBoard, setFilledBoard] = useState([])

  const sudokuFetcher = () => {
    const config = {
      method: "GET",
      url: "http://localhost:3000/newPuzzle"
    }
    axios(config)
      .then((res) => {
        setSudokuBoard(res.data.puzzle);
        setBoardId(res.data.id);
        const filled = [];
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (res.data.puzzle[i][j] !== 0) {
              filled.push(`${i}${j}`)
            }
          }

        }
        if (filled.length > 0) {
          setPreFilled(filled);
        }
      })
      .catch(err => console.log(err));
  };

  const sudokuChecker = (board) => {
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

  const handleChange = (event) => { // filledBoard is an empty array in here for some reason
    const newBoard = [[], [], [], [], [], [], [], [], [] ];
    console.log(newBoard, filledBoard);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        newBoard[i][j] = filledBoard[i][j];
      }
    }
    console.log(newBoard, filledBoard);
    newBoard[parseInt(event.target.id[0])][parseInt(event.target.id[0])] = parseInt(event.target.value);
    setFilledBoard(newBoard);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(filledBoard);
  };

  const makeBoardComponent = (inputBoard) => {
    const component = [];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const key = `${i}${j}`;
        if (!preFilled.includes(key)) {
          component.push(<input className="notFilled" type="number" min="1" max="9" key={key} id={key} onChange={handleChange} />);
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
  });

  useEffect(() => {
    if (sudokuBoard.length > 0 && boardComponent.length === 0) {
      setBoardComponent(makeBoardComponent(sudokuBoard));
    }
  });

  useEffect(() => {
    if (filledBoard.length === 0 && sudokuBoard.length > 0) {
      setFilledBoard(sudokuBoard);
    }
  });

  if (boardComponent.length > 0 && filledBoard.length > 0) {
    console.log(filledBoard)
    return (
      <div>
        <div className="boardContainer">
          <form onSubmit={handleSubmit}>
            {boardComponent}
            <input type="submit" className="sudokuSubmit" />
          </form>

        </div>
      </div>
    )
  }



};

export default Sudoku;

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
  const [boardForm, setBoardForm] = useState([]);

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

  const sudokuChecker = () => {
    const data = {
      id: boardId,
      puzzle: sudokuBoard,
    };
    const config = {
      method: "POST",
      url: "/puzzleSol",
      data: data,
    }
    axios.post('/puzzleSol', data)
      .then((res) => {
        if (res.data === 'Valid') {

        } else {

        }
      })
      .catch(err => console.log(err));
  };

  const handleChange = (event) => {
    sudokuBoard[parseInt(event.target.id[0])][parseInt(event.target.id[1])] = parseInt(event.target.value);
    setBoardForm(sudokuBoard);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sudokuChecker();
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
    if (boardForm.length === 0 && sudokuBoard.length > 0) {
      setBoardForm(sudokuBoard);
    }
  });

  useEffect(() => {
    if (sudokuBoard.length > 0 && boardComponent.length === 0) {
      setBoardComponent(makeBoardComponent(sudokuBoard));
    }
  });

  if (boardComponent.length > 0) {

    return (
      <div>
        <div className="boardContainer">
          <form onSubmit={handleSubmit}>
            {boardComponent}
            <input type="submit" className="sudokuSubmit" />
          </form>

        </div>
      </div>
    );
  }

};

export default Sudoku;

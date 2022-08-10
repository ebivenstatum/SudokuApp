import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sudoku() {

  const [sudokuBoard, setSudokuBoard] = useState([]);
  const [boardComponent, setBoardComponent] = useState([]);
  const [preFilled, setPreFilled] = useState([]);
  const [boardForm, setBoardForm] = useState([]);
  const [isSolved, setIsSolved] = useState([]);
  const [currentId, setCurrentId] = useState([]);

  const sudokuFetcher = () => {
    const config = {
      method: "GET",
      url: `http://localhost:3000/newPuzzle` ///${currentId}`
    }
    axios(config)
      .then((res) => {
        setCurrentId(res.data.id);
        setSudokuBoard(res.data.puzzle);
        setBoardForm(res.data.puzzle);
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
        setIsSolved('null');
      })
      .catch(err => console.log(err));

  };

  const sudokuChecker = () => {
    const data = {
      id: currentId,
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
         setIsSolved(true);
        } else if (res.data === "Invalid") {
          setIsSolved(false);
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
    if (isSolved === true) {
      setSudokuBoard([]);
      setBoardForm([]);
      setBoardComponent([]);
      setPreFilled([]);
      setCurrentId([]);
    } else {
      sudokuChecker();
    }
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
    if (currentId.length === 0) {
      setCurrentId(1);
    }
  });

  useEffect(() => {
    if (sudokuBoard.length === 0 && currentId > 0) {
      sudokuFetcher();
    }
  });

  useEffect(() => {
    if (isSolved.length === 0) {
      setIsSolved('null')
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
      <div className="boardContainer">
        <form onSubmit={handleSubmit}>
          {boardComponent}
          {isSolved === 'null' && <input type="submit" className="sudokuSubmit" value="Submit" />}
          {isSolved === false && <input type="submit" className="sudokuSubmit" value="Incorrect. Try Again" />}
          {isSolved === true && <input type="submit" className="sudokuSubmit" value="Correct. New Puzzle?" />}
        </form>
      </div>
    );
  }

};

export default Sudoku;

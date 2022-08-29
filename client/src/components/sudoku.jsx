import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sudoku() {

  const [sudokuBoard, setSudokuBoard] = useState(false);
  const [boardComponent, setBoardComponent] = useState(false);
  const [preFilled, setPreFilled] = useState(false);
  const [boardForm, setBoardForm] = useState(false);
  const [isSolved, setIsSolved] = useState('null');

  const handleChange = (event) => {
    sudokuBoard[parseInt(event.target.id[0])][parseInt(event.target.id[1])] = parseInt(event.target.value);
    setBoardForm(sudokuBoard);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSolved === true) {
      setSudokuBoard(false);
      setBoardForm(false);
      setBoardComponent(false);
      setPreFilled(false);
    } else {
      sudokuChecker();
    }
  };

  const handleGiveUp = (event) => {
    setSudokuBoard(false);
    setBoardForm(false);
    setBoardComponent(false);
    setPreFilled(false);
  };

  const sudokuFetcher = () => {
    const config = {
      method: "GET",
      url: `http://localhost:3000/newPuzzle`,
    }
    axios(config)
      .then((res) => {
        setSudokuBoard(res.data);
        setBoardForm(res.data);
        const filled = [];
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (res.data[i][j] !== 0) {
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
      puzzle: sudokuBoard,
    };
    const config = {
      method: "POST",
      url: "/puzzleSol",
      data: data,
    }
    axios.post('/puzzleSol', data)
      .then((res) => {
        if (res.data.solved) {
          setIsSolved(true);
        } else {
          setIsSolved(false);
        }
      })
      .catch(err => console.log(err));
  };

  const makeBoardComponent = (inputBoard) => {
    const component = [];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const key = `${i}${j}`;
        if (preFilled.includes(key)) {
          component.push(<input className="preFilled" key={key} id={key} value={inputBoard[i][j]} disabled />);

        } else {
          if ((i < 3 && j < 3) || (i < 3 && j > 5) || (i > 2 && i < 6 && j > 2 && j < 6) || (i > 5 && j < 3) || (i > 5 && j > 5)) {
            component.push(<input className="notFilledColor" type="number" min="1" max="9" key={key} id={key} onChange={handleChange} />);

          } else {

            component.push(<input className="notFilledWhite" type="number" min="1" max="9" key={key} id={key} onChange={handleChange} />);

          }
        }
      }
    }

    return component;
  };

  useEffect(() => {
    if (!sudokuBoard) {
      sudokuFetcher();
    }
    if (!boardForm && sudokuBoard.length > 0) {
      setBoardForm(sudokuBoard);
    }
    if (sudokuBoard.length > 0 && !boardComponent) {
      setBoardComponent(makeBoardComponent(sudokuBoard));
    }
  });

  if (boardComponent.length > 0) {

    return (
      <div className="boardContainer">
        <form onSubmit={handleSubmit}>
          {boardComponent}
          {isSolved === 'null' && <input type="submit" className="sudokuSubmit" value="Submit" />}
          {!isSolved && <input type="submit" className="sudokuSubmit" value="Incorrect. Try Again" />}
          {isSolved === true && <input type="submit" className="sudokuSubmit" value="Correct. New Puzzle?" />}
        </form>
        {!isSolved && <button className="sudokuSubmit" onClick={handleGiveUp}>Give up?</button>}
      </div>
    );
  }

};

export default Sudoku;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import sudokuFetcher from './sudokuFetcher';
import sudokuChecker from './sudokuChecker';

function Sudoku() {

  const [sudokuBoard, setSudokuBoard] = useState([]);
  const [boardComponent, setBoardComponent] = useState([]);
  const [preFilled, setPreFilled] = useState([]);
  const [boardForm, setBoardForm] = useState([]);
  const [isSolved, setIsSolved] = useState([]);

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

  const handleGiveUp = (event) => {
    setSudokuBoard([]);
    setBoardForm([]);
    setBoardComponent([]);
    setPreFilled([]);
    setCurrentId([]);
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
    if (sudokuBoard.length === 0 && currentId > 0) {
      sudokuFetcher();
    }
    if (isSolved.length === 0) {
      setIsSolved('null')
    }
    if (boardForm.length === 0 && sudokuBoard.length > 0) {
      setBoardForm(sudokuBoard);
    }
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
        {isSolved === false && <button className="sudokuSubmit" onClick={handleGiveUp}>Give up?</button>}
      </div>
    );
  }

};

export default Sudoku;

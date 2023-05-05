import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Numbers from './numbers';

function Sudoku() {

  const [sudokuBoard, setSudokuBoard] = useState(false);
  const [boardComponent, setBoardComponent] = useState(false);
  const [preFilled, setPreFilled] = useState(false);
  const [boardForm, setBoardForm] = useState(false);
  const [isSolved, setIsSolved] = useState('null');
  const [currentNumber, setCurrentNumber] = useState('null');
  const currentNum = useRef("");

  const handleNumberClick = (event) => {
    setCurrentNumber(event.target.id);
    currentNum.current = event.target.id;
  }

  const handleChange = (event) => {
    if (currentNumber === 'erase') {
      sudokuBoard[parseInt(event.target.id[0])][parseInt(event.target.id[1])] = 0;
    } else {
      sudokuBoard[parseInt(event.target.id[0])][parseInt(event.target.id[1])] = parseInt(currentNum.current);
    }

    setBoardForm(sudokuBoard);
    setBoardComponent(makeBoardComponent(sudokuBoard));
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
          component.push(<input className="cell preFilled" type="button" key={key} id={key} value={inputBoard[i][j]} />);

        } else {
          if ((i < 3 && j < 3) || (i < 3 && j > 5) || (i > 2 && i < 6 && j > 2 && j < 6) || (i > 5 && j < 3) || (i > 5 && j > 5)) {

            component.push(<input className="cell notFilledColor" type="button" key={key} id={key} onClick={handleChange} value={inputBoard[i][j] || " "}/>);

          } else {

            component.push(<input className="cell notFilledWhite" type="button" key={key} id={key} onClick={handleChange} value={inputBoard[i][j] || " "}/>);

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
        <Numbers handleNumberClick={handleNumberClick}currentNumber={currentNumber} />
        <div className="boardGrid">
          <form onSubmit={handleSubmit}>
            {boardComponent}
            {isSolved === 'null' && <input type="submit" className="sudokuSubmit" value="Submit" />}
            {!isSolved && <input type="submit" className="sudokuSubmit" value="Incorrect. Try Again" />}
            {isSolved === true && <input type="submit" className="sudokuSubmit" value="Correct. New Puzzle?" />}
            <br></br>
            {!isSolved && <button className="sudokuSubmit" onClick={handleGiveUp}>Give up?</button>}
          </form>
        </div>
      </div>
    );
  }

};

export default Sudoku;
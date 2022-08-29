import React, { useState, useEffect } from 'react';

import Sudoku from './components/sudoku';
import Info from './components/info';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [playingGame, setPlayingGame] = useState(false);

  const handleRulesClick = (event) => {
    setIsOpen(!isOpen);
  };

  const handleStart = (event) => {
    setPlayingGame(true);
  };

  return (
    <div className="container">
      <h1 className="topText" onClick={handleRulesClick}>Sudoku?</h1>
      {isOpen && <Info />}
      {!playingGame && <button className="sudokuSubmit" onClick={handleStart}>Start Game</button>}
      {playingGame && <Sudoku />}
    </div>
  );
};

export default App;
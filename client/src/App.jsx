import React, { useState, useEffect } from 'react';

import Sudoku from './components/sudoku';
import Info from './components/info';

function App() {

  const [isOpen, setIsOpen] = useState([]);

  useEffect(() => {
    if (isOpen.length === 0) {
      setIsOpen(false);
    }
  });

  const handleRulesClick = (event) => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <h1 className="topText" onClick={handleRulesClick}>Sudoku?</h1>
      {isOpen && <Info />}
      <Sudoku />
    </div>
  );
};

export default App;
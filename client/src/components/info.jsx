import React from 'react';

function Info({ handleClose }) {

  return (
    <div className="infoContainer">
      <h3 className="rulesTitle">How To Play</h3>
      <ul>
        <li>The puzzle grid contains 9 rows, 9 columns, and 9 subgrids.</li>
        <li>Every column must contain the numbers 1-9 without repetitions.</li>
        <li>Every row must contain the numbers 1-9 without repetitions.</li>
        <li>Every subgrid must contain the numbers 1-9 without repetitions.</li>
      </ul>
    </div>
  );

};

export default Info;
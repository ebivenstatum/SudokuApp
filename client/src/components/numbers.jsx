import React, { useState, useEffect } from 'react';

function Numbers({ handleNumberClick, currentNumber }) {

  const options = ["null", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const numbers = [];

  for (let i = 0; i < options.length; i++) {

    if (options[i] === currentNumber) {

      if (options[i] === "null") {
        numbers.push(<input className="cell numberSelect on" type="button" onClick={handleNumberClick} id={options[i]} value="Erase" />)
      } else {
        numbers.push(<input className="cell numberSelect on" type="button" onClick={handleNumberClick} id={options[i]} value={options[i]} />)
      }

    } else {

      if (options[i] === "null") {
        numbers.push(<input className="cell numberSelect" type="button" onClick={handleNumberClick} id={options[i]} value="Erase" />)
      } else {
        numbers.push(<input  className="cell numberSelect" type="button" onClick={handleNumberClick} id={options[i]} value={options[i]} />)
      }

    }

  }

  return (
    <div className="numberContainer">
      <form>
        {numbers}
      </form>
    </div>
  );

};

export default Numbers;
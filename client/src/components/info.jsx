import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Info({ handleClose }) {

  return (
    <div className="infoContainer">
      <h3 className="rulesTitle">How To Play</h3>
      <p>The puzzle grid contains 9 rows, 9 columns, and 9 subgrids.</p>
      <p>Every column must contain the numbers 1-9 without repetitions.</p>
      <p>Every row must contain the numbers 1-9 without repetitions.</p>
      <p>Every subgrid must contain the numbers 1-9 without repetitions.</p>
    </div>

  );

};

export default Info;
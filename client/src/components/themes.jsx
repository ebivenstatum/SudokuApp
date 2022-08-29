import React, { useState, useEffect } from 'react';
import { BsSun, BsSunset, BsMoon } from 'react-icons/bs';

function Themes() {

  const toggleTheme = (event) => {
    const element = document.body;
    const oldTheme = element.classList[0];
    const newTheme = event.target.id;

    if (oldTheme !== newTheme) {
      element.classList.add(newTheme);
      element.classList.remove(oldTheme);
    }
  }

  return (
    <div className="themeContainer">
      <BsSun className="theme-toggle" id="day-theme" onClick={toggleTheme} />

      <BsSunset className="theme-toggle" id="sunset-theme" onClick={toggleTheme} />

      <BsMoon className="theme-toggle" id="night-theme" onClick={toggleTheme} />
    </div>
  );
}

export default Themes;
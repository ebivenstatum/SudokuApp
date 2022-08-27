const sudokuFetcher = () => {
  const config = {
    method: "GET",
    url: `http://localhost:3000/newPuzzle`,
  }
  axios(config)
    .then((res) => {
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

export default sudokuFetcher;
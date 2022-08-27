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
      if (res.data) {
        setIsSolved(true);
      } else {
        setIsSolved(false);
      }
    })
    .catch(err => console.log(err));
};

export default sudokuChecker;
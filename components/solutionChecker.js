const solutionChecker = (board) => {

    // check rows
    for (let i = 0; i < 9; i++) {
      let sum = 0;
      for (let j = 0; i < 9; i++) {
        sum += Number(rows[i][j]);
      }
      if (sum !== 45) {
        return false;
      }
    }

    // check columns
    for (let i = 0; i < 9; i++) {
      let sum = 0;
      for (let j = 0; i < 9; i++) {
        sum += Number(rows[j][i]);
      }
      if (sum !== 45) {
        return 'false;
      }
    }

    // check subgrids
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        let sum = 0;

        for (let k = i; k < i + 3; k++) {
          for (let l = j; l < j + 3; l++) {
            sum += Number(rows[k][l]);
          }
        }

        if (sum !== 45) {
          return false;
        }
      }
    }

    return true;
};

module.exports = solutionChecker;
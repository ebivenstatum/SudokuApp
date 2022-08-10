const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;

const PuzzlesSchema = new Schema({
    puzzle: [[Number]],
    solution: [[Number]],
});

mongoose
    .connect(`mongodb://localhost:27017/SudokuAuth`)
    .then(console.log('Connected to MongoDB...'))
    .catch((err) => console.log(err))

const Puzzles = mongoose.model('Puzzles', PuzzlesSchema);

const addPuzzle = (newPuzzle, callback) => {

    Puzzles
        .create({ puzzle: newPuzzle.puzzle, solution: newPuzzle.solution })
        .then(() => {
            Puzzles
                .findOne({puzzle: newPuzzle.puzzle})
                .then(res => {
                    const clientPuzzle = {
                        id: res._id,
                        puzzle: res.puzzle,
                    };
                    // console.log(clientPuzzle);
                    callback(clientPuzzle);
                })
                .catch((err) => console.log(err));

        })
        .catch((err) => console.log(err));

};

const getSolution = (puzzleId, callback) => {

    Puzzles
        .findOne({_id: puzzleId})
        .then(res => callback(res.solution))
        .catch((err) => console.log(err));

}

module.exports = {
    addPuzzle,
    getSolution,
}
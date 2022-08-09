const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;

const PuzzlesSchema = new Schema({
    id: Number,
    puzzle: [[Number]],
    solution: [[Number]],
});

mongoose
    .connect(`mongodb://localhost:27017/SudokuAuth`)
    .then(console.log('Connected to MongoDB...'))
    .catch((err) => console.log(err))

const Puzzles = mongoose.model('Puzzles', PuzzlesSchema);

const addPuzzle = (newPuzzle, callback) => {
    const newId = 1 //Puzzles.count();

    Puzzles
        .create({ id: newId, puzzle: newPuzzle.puzzle, solution: newPuzzle.solution })
        .then(() => {
            const clientPuzzle = {
                id: newId,
                puzzle: newPuzzle.puzzle,
            };
            callback(clientPuzzle);
        })
        .catch((err) => console.log(err));

};

const getSolution = (puzzleId, callback) => {

    Puzzles
        .findOne({ id: puzzleId })
        .then(res => callback(res.solution))
        .catch((err) => console.log(err));

}

module.exports = {
    addPuzzle,
    getSolution,
}
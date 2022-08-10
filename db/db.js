const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;

const PuzzlesSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    puzzle: [[Number]],
    solution: [[Number]],
});

mongoose
    .connect(`mongodb://localhost:27017/SudokuAuth`)
    .then(console.log('Connected to MongoDB...'))
    .catch((err) => console.log(err))

const Puzzles = mongoose.model('Puzzles', PuzzlesSchema);

const addPuzzle = (newPuzzle, callback) => {
    let newId = 1;
    Puzzles
        .find({}, { _id: -1, id: 1 })
        .then(res => {
            newId = res.length + 1;

            Puzzles
                .create({ id: newId, puzzle: newPuzzle.puzzle, solution: newPuzzle.solution })
                .then(() => {
                    Puzzles
                        .findOne({ puzzle: newPuzzle.puzzle })
                        .then(res => {
                            const clientPuzzle = {
                                id: res.id,
                                puzzle: res.puzzle,
                            };
                            callback(clientPuzzle);
                        })
                        .catch((err) => console.log(err));

                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

};

const getSolution = (puzzleId, callback) => {

    Puzzles
        .findOne({ id: puzzleId })
        .then(res => {
            callback(res.solution);
        })
        .catch((err) => console.log(err));

}

module.exports = {
    addPuzzle,
    getSolution,
}
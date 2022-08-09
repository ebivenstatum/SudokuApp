const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;

mongoose
    .connect(`mongodb://${process.env.URL}:27017/SudokuAuth`)
    .then(console.log('Connected to MongoDB...'))
    .catch((err) => console.log(err)))
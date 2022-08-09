const express = require('express');
const path = require('path');
const compression = require('compression');

const port = 3000;

const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/public')));

app.listen(port, () => {
  console.log(`listening on port localhost:${port}`);
});
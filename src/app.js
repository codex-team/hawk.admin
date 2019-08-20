'use strict';

const express = require('express');

const app = express();
const port = 3000;

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));
'use strict';
require('dotenv');
const express = require('express');
const bcrypt = require('bcrypt');
const { handle404 } = require('./error-handlers/404');
const { handle500 } = require('./error-handlers/500');
const port = process.env.port;
require('./db');
const app = express();

const hello = (req, res) => res.status(200).send('Jim eats beans cold :c');

// Express Global Middleware
app.use(express.json());




//Routes
// app.get();
// app.get();
//app.post();
//app.put();
//app.delete();

//app.use('*', notFoundHandler);
app.get('/', hello);
app.use(handle404);
app.use(handle500);

function start(port) {
  app.listen(port, () => console.log(`Server up on port ${port}`));
}
module.exports = {
  app,
  start,
};
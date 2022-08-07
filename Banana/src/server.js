'use strict';
require('dotenv');
const express = require('express');
const bcrypt = require('bcrypt');
const { handle404 } = require('./error-handlers/404');
const { handle500 } = require('./error-handlers/500');
const port = process.env.port;
const db = require('./db');
const app = express();
const auth = require('./middleware/auth/route')
const noteHandler = require('./routes/note.js');

const hello = (req, res) => res.status(200).send('Jim eats beans cold :c');

// Express Global Middleware
app.use(express.json());
app.get('/', hello);




app.use(auth);

app.get('/notes', (req, res) => noteHandler.read(req, res));
app.get('/notes/:id', (req, res) => noteHandler.read(req, res));
app.post('/notes/', (req, res) => noteHandler.create(req, res));
app.put('/notes/:id', (req, res) => noteHandler.update(req, res));
app.delete('/notes/:id', (req, res) => noteHandler.delete(req, res));

//app.use('*', notFoundHandler);

//app.use('/note',note);



app.use(handle404);
app.use(handle500);
function start(port) {
  app.listen(port, () => console.log(`Server up on port ${port}`));
}
module.exports = {
  app,
  start,
};
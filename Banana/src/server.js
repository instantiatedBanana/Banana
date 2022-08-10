'use strict';
require('dotenv');
const express = require('express');
const bcrypt = require('bcrypt');
const { handle404 } = require('./error-handlers/404');
const { handle500 } = require('./error-handlers/500');
const port = process.env.port;
const { db } = require('./db');
const app = express();
const router = require('./middleware/auth/route')
const noteHandler = require('./routes/note.js');
const validateToken = require('./middleware/auth/auth');

const hello = (req, res) => res.status(200).send('Zayah eats beans cold :c');

// Express Global Middleware
app.use(express.json());
app.get('/', hello);



// middleware
app.use(router);
app.use(validateToken);

// routes to use
app.get('/notes', noteHandler.read);
app.get('/notes/:id', noteHandler.read);
app.post('/notes', noteHandler.create);
app.put('/notes/:id', noteHandler.update);
app.delete('/notes/:id', noteHandler.delete);

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
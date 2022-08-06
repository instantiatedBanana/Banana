'use strict';

require('dotenv').config();
const server = require('./Banana/src/server');
const { db } = require('./Banana/src/db');

db.sync()
  .then(() => {
    server.start(3002);
  })
  .catch(console.error);
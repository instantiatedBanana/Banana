'use strict';

function handle500(err, req, res, next) {
  res.status(500).send(`Handling ${req.path}, there was an exception ${error.message}`);
};
module.exports = { handle500 };
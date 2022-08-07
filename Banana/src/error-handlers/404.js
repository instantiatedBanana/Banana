'use strict';

function handle404(req, res, next) {
  res.status(404).send(`404 not found: ${req.url}`);
};
module.exports = { handle404 };
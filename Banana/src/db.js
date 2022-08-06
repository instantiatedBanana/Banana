const { Sequelize, DataTypes } = require('sequelize');
const  { userSchema } = require('./users/models.js');


let connection_string;

switch (process.env.NODE_ENV) {
  case 'production':
    connection_string = process.env.NODE_ENV;
    break;
  case 'dev':
    connection_string = 'sqlite::memory:';
    break;
  default:
    connection_string = `sqlite:${process.env.SQLITE_FILE ?? '../db'}`;
    break;
}
//connection_string = 'sqlite::memory:';
const db = new Sequelize(connection_string, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});



module.exports = {
  db,
  userSchema(db)
}
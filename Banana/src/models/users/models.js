'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DataTypes } = require('sequelize');



const user = (sequelize) => {
  const userModel = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: [DataTypes.VIRTUAL],
      get() {
        const payload = { username: this.username, role: this.role };
        return jwt.sign(payload, process.env.SECRET);
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  userModel.beforeCreate(async (user) => {

    let hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    // user.role = 'admin';

  });
  return userModel;
};

module.exports = {
  user
};
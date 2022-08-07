'use strict';
const { DataTypes } = require('sequelize');

function note(db) {
    return db.define('Note', {
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        private: { type: DataTypes.BOOLEAN, allowNull: false, }
    })
};

module.exports = { note }
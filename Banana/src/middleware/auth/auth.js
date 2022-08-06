'use strict'
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (token) {
            const user = jwt.verify(token, process.env.SECRET);
            req.user = user;
        };
        next();
    } catch (e) {
        return res.status(401).json({
            message: 'Auth Failed',
        })
    } 
}

module.exports = validateToken;
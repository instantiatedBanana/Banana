const { Users } = require('../../db');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

async function signupUser(req, res) {
    try {
        let obj = req.body;
        const findName = await Users.findOne({
            where: { username: req.body.username }
        });
        if (findName === null) {
            let newUsers = await Users.create(obj);
            res.status(200).json(newUsers);
        } else {
            res.status(500).send(`Cannot create user ${req.body.username}`);
        }
    } catch (e) {
        console.log(e);
    }
}

async function signinUser(req, res) {
    try {
        const user = await Users.findOne({
            where: { username: req.body.username },
        });
        // console.log('HEEEEEEYYYYYYYYY', user);
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (isValid) {
            res.status(200).json(user);

            // console.log(user);
            return;
        }
    } catch (e) {
        // Nothing
    }
    res
        .status(403)
        .send(
            "Invalid username/password. Too bad we don't have an account recovery mechanism."
        );
}

router.post('/signup', signupUser);
router.post('/signin', signinUser);

module.exports = router;

const users = require('express').Router();

const controller = require('../controllers/users')

users.get('/:param', (req, res) => {
    res.send(controller.getUser(req.params.param));
});

users.post('/', (req, res) => {
    controller.addUser(req, res);
});

exports.Users = users;
const model = require('../models/user').UserModel

exports.getUser = function(id) {
    return `User with id ${id} is ${JSON.stringify(model.get(id))}`;
}

exports.addUser = function(req, res) {
    let data = '';

    req.on('data', (chunk) => {
        data += chunk;
    });

    req.on('end', () => {
        console.log(JSON.stringify(data));
        let userData = JSON.parse(data);
        model.add(userData);
        res.send(`User ${JSON.stringify(userData)} added.`);
    });
}
const express = require('express');
const app = express();

const routes = require('./routes/users');

app.use('/users', routes.Users);

app.listen(3000);
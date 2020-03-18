const express = require('express');
const exphbs = require('express-handlebars');
const userRouter = require('./routes/contacts').Router;

const app = express()

app.use('/public', express.static('static'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/', userRouter);

app.listen(3000);
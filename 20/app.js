const discardBtnHelper = function (context, opt) {
    return `<button onclick="location.href='/'">Отказаться</button>`;
}

const express = require('express');
const exphbs = require('express-handlebars').create({helpers: {
    discardBtn: discardBtnHelper
}});
const userRouter = require('./routes/contacts').Router;

const app = express()

app.use(express.urlencoded({extended: false}));
app.use('/public', express.static('static'));

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');

app.use('/', userRouter);

app.listen(3000);
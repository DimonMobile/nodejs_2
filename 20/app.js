const express = require('express');
const exphbs = require('express-handlebars');

const app = express()

app.use('/public', express.static('static'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', {'kek': 'Ебать ту люсю нахуй'});
});

app.listen(3000);
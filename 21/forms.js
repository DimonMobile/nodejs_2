const express = require('express');
const fs = require('fs');
const app = express();
const cookie = require('cookie-parser');

app.use(express.urlencoded({extended: true}));
app.use(cookie());
app.use((req, res, next) => {
    if (req.cookies['kek'] !== 'kek' && req.path !== '/login') {
        res.redirect('/login');
    } else {
        next();
    }
});

app.get('/login', (req, res, next) => {
    let stream = fs.ReadStream('auth.html');
    stream.pipe(res);
});

app.get('/resource', (req, res) => {
    res.end('Resource');
});

app.post('/login', (req, res, next) => {
    if (req.body.user === 'user' && req.body.password === '1234') {
        res.cookie('kek', 'kek');
        res.redirect('/resource');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('kek').redirect('/resource');
});

app.listen(3000);
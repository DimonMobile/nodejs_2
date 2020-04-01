const express = require('express');
const app = express();

const passport = require('passport');
const DigestStrategy = require('passport-http').DigestStrategy;
const session = require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: '123456'
});

const PORT = 3000;

const Users = [
    {user: 'user1', password: 'user1'},
    {user: 'user2', password: 'user2'},
    {user: 'user3', password: 'user3'}
];

const getCredential = function (user) {
    let u = Users.find((e) => {return e.user.toUpperCase() == user.toUpperCase();});
    return u;
};

const verPassword = function (pass1, pass2) {
    return pass1 == pass2;
}

passport.use(new DigestStrategy({gop: 'auth'}, (user, done) => {
    let rc = getCredential(user);
    if (!rc) {
        rc = done(null, false);
    } else {
        rc = done(null, rc.user, rc.password);
    }
    return rc;
}));

passport.serializeUser((user, done) => {
    console.log('Serialize', user);
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log('Deserialize', user);
    done(null, user);
});

app.use(session);
app.use(passport.initialize());
app.use(passport.session());


app.get('/login', (req, res, next) => {
    console.log(`req.session.logout: ${req.session.logout}`);
    if (req.session.logout && req.headers['authorization']) {
        console.log("aaauth");
        req.session.logout = false;
        delete req.headers['authorization'];
    }
    next();
}, passport.authenticate('digest'), (req, res, next) => next()
).get('/login', (req, res, next) => {
    console.log('2');
    req.session.log = true;
    res.end('Root /');
});

app.get('/resource', (req, res, next) => {
    if (req.session.log) {
        res.end('Resource');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.logout = true;
    req.session.log = false;
    res.redirect('/login');
});

app.listen(PORT);

console.log(`Server hosted on http://localhost:${PORT}`)
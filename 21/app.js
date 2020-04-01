const express = require('express');
const app = express();

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
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

passport.use(new BasicStrategy((user, password, done) => {
    console.log('passport.user', user, password);
    let rc = getCredential(user);
    if (!rc) {
        rc = done(null, false, {message: 'Incorrect username'});
    } else if (!verPassword(rc.password, password)) {
        rc = done(null, false, {message: 'Incorrect password'});
    } else {
        rc = done(null, user);
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
}, passport.authenticate('basic'), (req, res, next) => next()
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
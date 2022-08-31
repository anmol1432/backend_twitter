const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
var passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express()
const port = process.env.PORT
const db = process.env.DATABASE
var LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('./models/user');


app.use(cookieParser());
app.use(express.json()); // parse body as a json
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //in milliseconds
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("SEREVER ERROR:- ", error)
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: " user.id", username: user.name });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, "user");
    });
});


mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(() => {
    console.log("MONGO DB CONNECTED");
}).then(() => {
    app.listen(port, () => {
        console.log(`SERVER RUNNING :- http://localhost:${port}`)
    })
}).catch((error) => {
    console.log(error)
})

app.use(require('./routes/index'))


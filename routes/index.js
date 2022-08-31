const express = require('express')
const authenticate = require('../middleware/authenticate');
var jwt = require('jsonwebtoken');
const router = express.Router()
const signUp = require('.././controllers/signup');
const signIn = require('.././controllers/signin');
var passport = require('passport');





router.get('/', authenticate, (req, res) => {
    const accessToken = jwt.sign({ username: 'anmol from index' }, process.env.JWT_SECRET_KEY);
    return res.json({ accessToken: accessToken, data: 'data' })
})



router.post('/signup', signUp)
router.post('/signin', passport.authenticate('local', {
    failureRedirect: ''),
    function (req, res) {

        res.redirect('/');
    })

module.exports = router;
const express = require('express')
const { authenticate } = require('../utils/middleware');
var jwt = require('jsonwebtoken');
const router = express.Router()
const signUp = require('.././controllers/signup');
const signIn = require('.././controllers/signin');

router.get('/', authenticate);


router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
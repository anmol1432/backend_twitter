// authenticated middleware

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    try {
        const token = await jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
        if (!token) {
            console.log("token not found", token);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        await User.findOne({ _id: token._id, "tokens.token": req.cookies.token }, (err, user) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            req.token = req.cookies.token;
            req.userID = user._id;
            req.user = user;
            next();
        })
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next()
}

module.exports = authenticate;
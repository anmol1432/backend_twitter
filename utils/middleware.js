// Middleware
var jwt = require('jsonwebtoken');

module.exports = {
    authenticate: function (req, res, next) {
        const userInfo = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY);
        console.log(userInfo);
        next()
    }
}
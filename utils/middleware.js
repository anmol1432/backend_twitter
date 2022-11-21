// Middleware
var jwt = require('jsonwebtoken');

module.exports = {
    authenticate: async function (req, res, next) {
        try {
            const userInfo = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY);
            if (userInfo) {
                next()
            } else {
               return res.status(400).json({ error: 'Credentials Not Match', status: 0 })
            }
        } catch (error) {
            return res.status(400).json({ error: 'Credentials Not Match', status: 0 })
        }
    }
}
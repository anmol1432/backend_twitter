const User = require('../models/user');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body.data
        if (!email || !password) {
            return res.status(400).json({ error: 'Bad Request' })
        }
        const user = await User.findOne({ email: email })
        if (user) {
            const passowrdMatch = await bcrypt.compare(password, user.password)
            if (user && passowrdMatch) {
                const accessToken = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
                return res.status(200).json({ message: 'Success', token: accessToken, status: '200' })
            }
            return res.status(422).json({ error: 'Credentials Not Match ' })
        }
        else {
            return res.status(422).json({ error: 'Credentials Not Match ' })
        }
    } catch (error) {
        console.log("SEREVER ERROR:- ", error)
    }
}

module.exports = signIn 
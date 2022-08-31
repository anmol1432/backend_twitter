const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: 'Bad Request' })
        }
        //check for existing user
        const user = await User.findOne({ email: email })
        if (user) {
            // Validate password
            const passowrdMatch = await bcrypt.compare(password, user.password)
            if (user && passowrdMatch) {
                const accessToken = await jwt.sign({
                    _id: user._id,
                    email: user.email
                }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                await User.findOneAndUpdate({ email: email }, { tokens: [{ token: accessToken }] })
                // var farFuture = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 10)); // ~10d
                // console.log("accessToken", req.cookies);
                // res.cookie('token', accessToken, {
                //     maxAge: farFuture,
                //     httpOnly: true,
                //     secure: false
                // })
                return res.status(200).json({ message: 'Success', data: { 'jwt': accessToken } })
            }
            return res.status(422).json({ error: 'Credentials Not Match ' })
        }
        else {
            return res.status(422).json({ error: 'Credentials Not Match ' })
        }
    } catch (error) {
        res.send({ message: '500 Internal Server Error' })
        console.log("SEREVER ERROR:- ", error)
    }
}

module.exports = signIn 
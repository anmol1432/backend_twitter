const User = require('../models/user');
var jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body.data
        const user = await User.findOne({ email: email });

        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(422).json({ error: 'Bad Request' })
        }
        else if (user) {
            return res.status(422).json({ error: 'Email Already Exist' })
        }
        else if (password != confirmPassword) {
            return res.status(422).json({ error: 'Password Is Not Same As Confirm Passowrd' })
        }
        else {
            const newUser = new User({ name, email, password, confirmPassword, phone })
            await newUser.save()
            const getUser = await User.findOne({ email: email, name: name });
            const accessToken = await jwt.sign({ _id: getUser._id }, process.env.JWT_SECRET_KEY);
            return res.status(200).json({
                message: 'Success', token: accessToken, userInfo: {
                    name, email, phone
                }, status: '200'
            })
        }

    } catch (error) {
        console.log("SEREVER ERROR:- ", error)
    }
}

module.exports = signUp 
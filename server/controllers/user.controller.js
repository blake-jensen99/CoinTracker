const { request, response } = require('express')
const User = require('../models/user.model')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');



module.exports.register = (req, res) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);

            res
                .cookie("usertoken", userToken, {httpOnly: true})
                .json({ msg: "success!", user: user });
        })
        .catch(err => res.status(400).json(err));
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
        return res.status(400).json({msg: "Invalid Login Attempt"});
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
        return res.status(400).json({msg: "Incorrect Password"});
    }

    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY); 

    res
        .cookie("usertoken", userToken, {httpOnly: true})
        .json({ msg: "success!" });
        
}





module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.getUser = (req, res) => {
    const decodedJwt = jwt.decode(req.cookies.usertoken, {complete:true})
    User.findOne({_id: decodedJwt.payload.id})
        .then(oneUser => res.json(oneUser))
        .catch(err => res.status(500).json(err))
}

module.exports.updateOne = (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, {$push: {favs: req.body}}, {new:true, runValidators: true})
        .then(updatedUser => {
            res.json({user: updatedUser})
        })
        .catch(err => res.status(400).json(err))
}

module.exports.updateOneRemove = (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, {$pull: {favs: req.body}}, {new:true, runValidators: true})
        .then(updatedUser => {
            res.json({user: updatedUser})
        })
        .catch(err => res.status(400).json(err))
}
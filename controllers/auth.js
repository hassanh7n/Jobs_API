const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const Register = async(req, res) => {
    // const {name, email, password} = req.body;

    // const salt = await bcryptjs.genSalt(10)
    // const hashpassword = await bcryptjs.hash(password, salt)

    // const temuser = {name, email, password : hashpassword}

    // if(!name || !email || !password){
    //     throw new BadRequestError("Please provide username, email and password")
    // }

    // const user = await User.create({...temuser})
    const user = await User.create({...req.body})

    // const token = jwt.sign({userID:user._id, name : user.name}, 'JWTSecret', {expiresIn : '30d'})
    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({
        success : true,
        user : {name : user.name},
        msg : token
    })
}


const LogIn = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        throw new BadRequestError("Please provide email and password")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError("Invalid credentials")
    }

    const token = await user.createJWT()
    const isPasswordCorrect = await user.ComparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid credentials")
    }


    res.status(StatusCodes.CREATED).json({
        success : true,
        user : {name : user.name},
        msg : token
    })
}


module.exports = {
    Register,
    LogIn
}
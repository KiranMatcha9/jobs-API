const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require('../errors')


const register = async (req,res)=>{
    const user = await User.create({...req.body}) 
    const token = user.createJwt()
    res.status(StatusCodes.CREATED).json({user: {name: user.name},token})
}

const login = async (req,res) =>{

    const {email,password} = req.body

    //check for username and password
    if(!email || !password){
        throw new BadRequestError('Please provide username and password')
    }

    const user = await User.findOne({email})

    if(!user){

        throw new UnauthenticatedError('Invalid credentials')
    }

    //Comnpare user
    const isPasswordCorrect = await user.comparePasswords(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Inavlid credentials')
    }
    const token = user.createJwt()
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
}

module.exports = {register,login}
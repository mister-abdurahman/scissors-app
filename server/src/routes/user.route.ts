import express from 'express'
import bcrypt from 'bcrypt' 
import userModel, { RetrievedUserDetail } from '../models/user.model'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const app = express()
const userRouter = express.Router()

app.use(cookieParser())
require("dotenv").config();

// jwt is in secs and cookie is in millisecs
const maxAge = 3*24*60*60
const createToken = (id: string) =>{
    return jwt.sign({id}, "secret_of_jwt_auth12345", {expiresIn: maxAge})
}

const handleErrors = (err) =>{
    console.log(err.message, err.code)
    let errors = {email: '', password: ''}
    // duplicate error code:
    if(err.code === 11000){
        errors.email = 'This email is already registered';
        return errors;
    }
    if(err.message === 'incorrect email') errors.email = 'That email is not registered'
    if(err.message === 'incorrect password') errors.password = 'That password is incorrect'

    return errors
}

userRouter.post('/signup', async (req, res)=>{
try {
    const {firstName, lastName, email, password} = req.body
 
    if (!email || !password || !firstName || !lastName) {
        throw new Error("Ensure you fill all the inputs correctly");
      }
    // const user = await userModel.create({firstName, lastName, email, password:hashedPassword})
    const newUser = new userModel({ firstName, lastName, email, password });
    await newUser.save()
    const token = createToken(newUser._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
    res.status(200).json({newUser: newUser._id})
} catch (error) {
    console.log(error)
    res.status(422).json({error})
}
})

userRouter.post('/login', async function(req, res){
    const {email, password} = req.body

    try {
        //   const retrievedUser:RetrievedUserDetail  = await userModel.findOne({email})
        //   if(!retrievedUser) throw Error('Incorrect Email')
        //   const isMatch = await retrievedUser.comparePassword(password)
        //   console.log(isMatch)
        //   res.status(200).json({id: retrievedUser._id})

       const user = await userModel.login(email, password)
       const token = createToken(user._id)
       res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
       res.status(200).json({newUser: user._id})

       res.status(200).json({user: user._id})
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({errors})
    }
})

export default userRouter

// fix error handlin, then next up is authenticating routes with jwt auth.

//netninja #15: https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp

// JWT signing:
// Headers: tells the server what type of signature is being used (meta)
// Payload: used to identify the user (contains user id)
// Makes the token secure (like a stamp of authnticity)

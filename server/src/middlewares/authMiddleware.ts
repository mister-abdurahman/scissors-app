import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; 
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY

export const requireAuth = (req, res, next)=>{
    // console.log("jwt value is:", jwt)
    // console.log("req.cookies.jwt value is:", req.cookies?.jwt)

    if(req.cookies?.jwt) {
        jwt.verify(req.cookies.jwt, SECRET_KEY, (err, decodedToken)=>{
            if(err){
                console.log(err.message)
                res.redirect('/')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.redirect('/')
    }
}
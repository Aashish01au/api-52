const jwt = require("jsonwebtoken")
require("dotenv").config()
const authSvc = require("../app/auth/auth.services")
const checkLogin = async (req,res,next)=>{
    try {
        let token = null
        if(req.query['token']){
            token=req.query['token']
        }

        if(req.headers["authorization"]){
            token=req.headers["authorization"]
        }

        if(!token){
            next({code:403, message:"Token is requireddd"})
        }else{
            token = (token.split(" ")).pop()
            if(!token){
                next({code:401, message :" Token is empty or null"})
            }else{
                const data = jwt.verify(token,process.env.JWT_SECRET)
                if(!data.hasOwnProperty('_id')){
                    next({code:401, message:"Invalid token"})
                }else{

                    let user = await authSvc.findUserByFilter({_id:data._id})

                    console.log("user")
                    if(!user){
                        next({code:404, message:"User does not exist anymore..."})
                    }
                    req.authUser=user
                    next()
                }
            }
        }
    } catch (exception) {
        next(exception)
    }
}

module.exports = checkLogin
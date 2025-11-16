const generateRandomString = require("../../helpers/helpers")
const mailSvc = require("../../services/mail.services")
const AuthRequest = require("./auth.request")
const authReq = require("./auth.request")
const authSvc = require("./auth.services")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
class AuthController{
    async registerUser(req,res,next){
        try {
            let mapped = new AuthRequest(req).transformRegisterData()
            let user = await authSvc.storeuser(mapped)
          await  mailSvc.sendEmail(user.email,"Activete user successfullt",
            `
            <h1> Dear ${user.name},</h1>
            <a href="${process.env.FRONT_END_URL}/${user.token}">${process.env.FRONTEND_URL}/${user.token}</a>
            <p>no reoply system ,,<br> thank you</p>
            `)
            res.json({
                result:user,
                message:"Register User successfully",
                meta : null
            })
        } catch (exception) {
            next(exception)
        }
    }

    async activateUser(req,res,next){
        try {
            let token = req.params.token
            let userDetails = await authSvc.findUserByFilter({
                token:token
            })

            if(userDetails.length !==1){
                next({code:404,message:"User Does not exist..."})
            }else{
                let password = bcrypt.hashSync(req.body.password,10)

                let activateUser = await authSvc.updateUser({_id:userDetails[0]._id},{
                    password:password,
                    token:null,
                    status:"active"
                })

                res.json({
                    result:activateUser,
                    message:"Activate user successfully",
                    meta:null
                })

            }
        } catch (exception) {
            next(exception)
        }
    }

    async loggedIinUser(req,res,next){
        try {
            let credentials = req.body
            let userDetails = await authSvc.findUserByFilter({
                email : credentials.email
            })

            if(userDetails.length !==1){
                next({code:401, message:"User Does not existt.."})
            }else{
                userDetails =  userDetails[0]

                if(userDetails.token !==null){
                    next({code:401, message:"User is not activated yet"})
                }

                if(!bcrypt.compareSync(credentials.password,userDetails.password)){
                    next({code:401, message :" Credentials does not match"})
                }else{
                    if(userDetails.status !=="active"){
                        next({code:401, message:"User is not activated Yet.."})
                    }
                    let token = jwt.sign({_id:userDetails._id},process.env.JWT_SECRET,{
                        expiresIn:"1hr"
                    })
                    let refreshToken = jwt.sign({_id:userDetails._id},process.env.JWT_SECRET,{
                        expiresIn:"1hr"
                    })

                    res.json({
                        result:{
                            token : token,
                            refreshToken:refreshToken,
                            details:{
                                id:userDetails._id,
                                name:userDetails.name,
                                role:userDetails.role
                            }
                        }
                    })
                }
            }
        } catch (exception) {
            
            next(exception)
        }
    }

    async profile(req,res,next){
        try {
            let user = req.authUser
            res.json({
                result:user,
                message:"user Profile",
                meta : null
            })
        } catch (exception) {
            next(exception)
        }
    }
    async forgetPassword(req,res,next){
        try {
            let email = req.body.email
            let userDetails = await authSvc.findUserByFilter({
                email:email
            })

            if(userDetails.length !==1){
                next({code:404, message : "user Does ont exist.."})
            }else{
               let  user = userDetails[0]

               user.forgetToken = generateRandomString()
               let date = new Date()
               date.setUTCHours(date.getUTCHours()+2)
               user.validateTill = date

               let message = await authSvc.getResetMessage(user.name,user.forgetToken)

               await mailSvc.sendEmail(user.email,"reset_password",message)

               user.save()

               res.json({
                result:{
                    details:user
                },
                message:"Reset passowrd requset successfulyy",
                meta : null
               })
            }
        } catch (exception) {
            next(exception)
        }
    }

    async resetPassword(req,res,next){
        try {
            try {
                let forgetToken = req.params.token
                let userDetails = await authSvc.findUserByFilter({
                    forgetToken:forgetToken
                })
    
                if(userDetails.length !==1){
                    next({code:404,message:"User Does not exist..."})
                }else{
                    let password = bcrypt.hashSync(req.body.password,10)
    
                    let activateUser = await authSvc.updateUser({_id:userDetails[0]._id},{
                        password:password,
                        forgetToken:null,
                        validateTill:null
                    })
    
                    res.json({
                        result:activateUser,
                        message:" user password changed successfully",
                        meta:null
                    })
    
                }
            } catch (exception) {
                next(exception)
            }
        } catch (exception) {
            next(exception)
        }
    }
}

const authCtrl = new AuthController()

module.exports = authCtrl
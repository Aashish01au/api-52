const express = require("express")
const { ZodError } = require("zod")
const routes = require("../routes")
const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken")
const app = express()
require("./mongodb.config")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/v1/",routes)
app.use((req,res,next)=>{
    next({code:400, message:"Page not found"})
})


app.use((error,req,res,next)=>{
    console.log(error)
    let code = error.code ?? 500
    let message = error.message ?? "internal Server Errorr"

    if(error instanceof ZodError){
        let errorBag = {}

        error.errors.map((errorObj)=>{
            errorBag[errorObj.path[0]] = errorObj.message
        })

        code=403,
        message = errorBag
    }

    if(error instanceof JsonWebTokenError || error instanceof TokenExpiredError){
        code=401,
        message = error.message
    }

    res.status(code).json({
        result:null,
        message:message,
        meta:null
    })
})

module.exports = app
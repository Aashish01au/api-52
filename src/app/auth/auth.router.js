const checkLogin = require("../../middleware/auth.middleware")
const checkPermission = require("../../middleware/rbac.middleware")
const uploaders = require("../../middleware/uploader.middleware")
const validatedSchema = require("../../middleware/validator.middleware")
const authCtrl = require("./auth.controller")
const { registerUserSchema, activateUserSchema, forgetPasswordSchema, resetPasswordSchema, loggedInUserSchema } = require("./auth.validator")

const authRouter = require("express").Router()

authRouter.post("/register",uploaders.single("image"), validatedSchema(registerUserSchema),authCtrl.registerUser)
authRouter.post("/activate/:token",validatedSchema(activateUserSchema),authCtrl.activateUser)
authRouter.post("/login",validatedSchema(loggedInUserSchema),authCtrl.loggedIinUser)
authRouter.get("/me",checkLogin,checkPermission("admin"),authCtrl.profile)
authRouter.post("/forget-password",validatedSchema(forgetPasswordSchema),authCtrl.forgetPassword)
authRouter.post("/reset-password/:token",validatedSchema(resetPasswordSchema),authCtrl.resetPassword)
module.exports = authRouter
const authRouter = require("../app/auth/auth.router")
const bannerRouter = require("../app/banner/banner.router")
const brandRouter = require("../app/brand/brand.router")
const routes = require("express").Router()
routes.use("/auth",authRouter)
routes.use("/banner",bannerRouter)
routes.use("/brand",brandRouter)

module.exports = routes


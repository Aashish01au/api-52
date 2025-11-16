const checkLogin = require("../../middleware/auth.middleware")
const checkPermission = require("../../middleware/rbac.middleware")
const uploaders = require("../../middleware/uploader.middleware")
const validatedSchema = require("../../middleware/validator.middleware")
const bannerCtrl = require("./banner.controller")
const { createBannerSchema, updateBannerSchema } = require("./banner.validator")

const bannerRouter = require("express").Router()
bannerRouter.get("/home-list",bannerCtrl.getBannerForHome)
bannerRouter.route("/")
    .get(checkLogin,checkPermission,)
    .post(uploaders.single("image"),validatedSchema(createBannerSchema),bannerCtrl.createBanner)

bannerRouter.route("/:id")
    .get(checkLogin,checkPermission("admin"),bannerCtrl.getBanner)
    .put(checkLogin,checkPermission("admin"),validatedSchema(updateBannerSchema),bannerCtrl.updateBanner)
    .delete(checkLogin,checkPermission("admin"),bannerCtrl.deletebannerById)



module.exports = bannerRouter
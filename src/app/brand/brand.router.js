const checkLogin = require("../../middleware/auth.middleware")
const checkPermission = require("../../middleware/rbac.middleware")
const uploaders = require("../../middleware/uploader.middleware")
const validatedSchema = require("../../middleware/validator.middleware")
const brandCtrl = require("./brand.controller")
const { createBrandSchema, updateBrandSchema } = require("./brand.validator")

const brandRouter = require("express").Router()
brandRouter.get("/home-list",brandCtrl.getBrandForHome)
brandRouter.route("/")
    .get(checkLogin,checkPermission,)
    .post(uploaders.single("image"),validatedSchema(createBrandSchema),brandCtrl.createBrand)

brandRouter.route("/:id")
    .get(checkLogin,checkPermission("admin"),brandCtrl.getBrand)
    .put(checkLogin,checkPermission("admin"),validatedSchema(updateBrandSchema),brandCtrl.updateBrand)
    .delete(checkLogin,checkPermission("admin"),brandCtrl.deletebrandById)



module.exports = brandRouter
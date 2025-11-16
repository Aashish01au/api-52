const { deleteImage } = require("../../helpers/helpers")
const brandSvc = require("./brand.services")

class BrandController{
    async createBrand(req,res,next){
        try {
            
            let  brand = await brandSvc.transformBrandData(req,true)
            let storeBrand = await brandSvc.storeBrand(brand)
            res.json({
                result:storeBrand,
                message:" Brand Created Successfully",
                meta : null
            })

        } catch (exception) {
            next(exception)
        }
    }

    async getAllBrands(req,res,next){
        try {
            let search = req.query.search ?? null
            let limit = 10
            let currentpage = Number(req.params.page) ? req.params.page : 1
            let skip = (currentpage-1)*limit

            let filter = {}

            if(search){
                filter= {
                    ...filter,
                    $or:[
                        {title: new RegExp(search,"i")},
                        {link: new RegExp(search,"i")},
                        {status: new RegExp(search,"i")}
                    ]
                }
            }

            let totalCount = new brandSvc.totalCount(filter)
            let brands = await brandSvc.getAllBrandByFilter(filter,{
                skip:skip,
                limit:limit
            })

            res.json({
                result:brands,
                message:"Brands data fetched Successfully",
                meta:{
                    total:totalCount,
                    limit:limit,
                    page:currentpage
                }
            })
        } catch (exception) {
            next(exception)
        }
    }

    async updateBrand(req,res,next){
        try {
            let brandDetails = await brandSvc.getBrandById(req.params.id)

            if(!brandDetails){
                next({code:404, message: "User Does not exist"})
            }
            let  brand = await brandSvc.transformBrandData(req,true)
            let storeBrand = await brandSvc.updateBrand(brand)
            if(brand.image !==storeBrand.image){
                deleteImage("/public/uploaders/", banner.image)
            }
            res.json({
                result:storeBrand,
                message:" Brand Created Successfully",
                meta : null
            })

        } catch (exception) {
            next(exception)
        }
    }

    async getBrand(req,res,next){
        try {
            let brand = await brandSvc.getBrandById(req.params.id)

            if(!brand){
                next({code:404, message:"Brand Does not exit"})
            }else{
                res.json({
                    result:brand,
                    message:"Brand data fetched Scucuessfyully",
                    meta : null
                })
            }

        } catch (exception) {
            next(exception)
        }
    }

    async deletebrandById(req,res,next){
        try {
            let brand = await brandSvc.deleteBrand(req.parms.id)

           if(!brand){
                next({code:404, message:"Brand does not exist..."})
           }else{
            deleteImage("./public/uploaders/"+brand.image)
            res.json({
                result:brand,
                message :" Brand deleted Successfully",
                meta : null
            })
           }
        } catch (exception) {
            next(exception)
        }
    }

    async getBrandForHome(req,res,next){
        try {
            let limit = Number(req.params.limit) ?? 10
            let brand = await brandSvc.getBrandFromHome(limit)

            res.json({
                result:brand,
                message:"Home Brand data fetched Scuuessgully",
                meta : null
            })
        } catch (exception) {
            next(exception)
        }
    }

}

const brandCtrl = new BrandController()
 module.exports = brandCtrl
const { deleteImage } = require("../../helpers/helpers")
const bannerSvc = require("./banner.services")

class BannerController{
    async createBanner(req,res,next){
        try {
            let  banner = await bannerSvc.transformBannerData(req)
            let storeBanner = await bannerSvc.storeBanner(banner)
            res.json({
                result:storeBanner,
                message:" Banner Created Successfully",
                meta : null
            })

        } catch (exception) {
            next(exception)
        }
    }

    async getAllBanners(req,res,next){
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

            let totalCount = new bannerSvc.totalCount(filter)
            let banners = await bannerSvc.getAllBannerByFilter(filter,{
                skip:skip,
                limit:limit
            })

            res.json({
                result:banners,
                message:"Banners data fetched Successfully",
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

    async updateBanner(req,res,next){
        try {
            let bannerDetails = await bannerSvc.getBannerById(req.params.id)

            if(!bannerDetails){
                next({code:404, message: "User Does not exist"})
            }
            let  banner = await bannerSvc.transformBannerData(req,true)
          
            let storeBanner = await bannerSvc.updateBanner(banner)
            if(banner.image !==storeBanner.image){
                deleteImage("/public/uploaders/", banner.image)
            }
            res.json({
                result:storeBanner,
                message:" Banner Created Successfully",
                meta : null
            })

        } catch (exception) {
            next(exception)
        }
    }

    async getBanner(req,res,next){
        try {
            let banner = await bannerSvc.getBannerById(req.params.id)

            if(!banner){
                next({code:404, message:"Banner Does not exit"})
            }else{
                res.json({
                    result:banner,
                    message:"Banner data fetched Scucuessfyully",
                    meta : null
                })
            }

        } catch (exception) {
            next(exception)
        }
    }

    async deletebannerById(req,res,next){
        try {
            let banner = await bannerSvc.deleteBanner(req.parms.id)

           if(!banner){
                next({code:404, message:"Banner does not exist..."})
           }else{
            let banner = await brandSvc.getBrandFromHome(limit)
            res.json({
                result:banner,
                message :" Banner deleted Successfully",
                meta : null
            })
           }
        } catch (exception) {
            next(exception)
        }
    }

    async getBannerForHome(req,res,next){
        try {
            let limit = Number(req.params.limit) ?? 10
            let banner = await bannerSvc.getBannerFromHome(limit)

            res.json({
                result:banner,
                message:"Home Banner data fetched Scuuessgully",
                meta : null
            })
        } catch (exception) {
            next(exception)
        }
    }

}

const bannerCtrl = new BannerController()
 module.exports = bannerCtrl
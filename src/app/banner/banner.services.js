const BannerModel = require("./banner.model")

class BannerServices{

    async transformBannerData(req,isEdit=false){
        try {
            let banner = {
                ...req.body,
                createdBy:null
            }
            if(!req.file && isEdit === false){
                throw {code:401, message:"Validation Failure!!!",result:{image:"Image is required!!!"}}
            }else if(req.file){
                req.body.image = req.file.filename
            }

            return banner
        } catch (exception) {
            throw exception
        }
    }
    async storeBanner(data){
        try {
            let banner = new BannerModel(data)
            return await banner.save()
        } catch (exception) {
            throw exception
        }
    }

    async totalCount(filter){
        try {
            return await BannerModel.countDocuments(filter)
        } catch (exception) {
            throw exception
        }
    }

    async getAllBannerByFilter(filter,paging={skip:0,limit:0}){
        try {
            let banners = await BannerModel.find(filter)
                    .populate("createdBy",["role","name","email"])
                    .sort({_id:"desc"})
                    .skip(paging.skip)
                    .limit(paging.limit)
            return banners
        } catch (exception) {
            throw exception
        }
    }

    async getBannerById(id){
        try {
            let banner = await BannerModel.findById(id)
            return banner
        } catch (exception) {
            throw exception
        }
    }

    async updateBanner(id,data){
        try {
            let updBanner = await BannerModel.findByIdAndUpdate(id,{
                $set:data
            })

            return updBanner
        } catch (exception) {
            throw exception 
        }
    }

    async deleteBanner(id){
        try {
            let banner = await BannerModel.findByIdAndDelete(id)
            return banner
        } catch (exception) {
            throw exception
        }
    }

    async getBannerFromHome(){
        try {
            let homeBanner = await BannerModel.find({
                status:"active"
            })

            return homeBanner
        } catch (exception) {
            throw exception
        }
    }
}
const bannerSvc = new BannerServices()
module.exports = bannerSvc
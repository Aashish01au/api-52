const BrandModel = require("./brand.model")
const slugify = require("slugify")
class BrandServices{

    async transformBrandData(req,isEdit=false){
        try {
            console.log(req.body)
            let brand = {
                ...req.body,
                credatedBy:req.authUser
            }
            console.log(brand)
            if(!req.file && isEdit === false){
                throw {code:401, message:"zValidation Failure!!!",result:{image:"Image is required!!!"}}
            }else if(req.file){
                req.body.image = req.file.filename
            }

            if(!isEdit){
                brand['slugify'] = slugify(brand.title,{
                    replacement: true,
                    lower: true,
                    trim : true
                })
            }

            return brand
        } catch (exception) {
            throw exception
        }
    }
    async storeBrand(data){
        try {
            let brand = new BrandModel(data)
            return await brand.save()
        } catch (exception) {
            throw exception
        }
    }

    async totalCount(filter){
        try {
            return await BrandModel.countDocuments(filter)
        } catch (exception) {
            throw exception
        }
    }

    async getAllBrandByFilter(filter,paging={skip:0,limit:0}){
        try {
            let brands = await BrandModel.find(filter)
                    .populate("createdBy",["role","name","email"])
                    .sort({_id:"desc"})
                    .skip(paging.skip)
                    .limit(paging.limit)
            return brands
        } catch (exception) {
            throw exception
        }
    }

    async getBrandById(id){
        try {
            let brand = await BrandModel.findById(id)
            return brand
        } catch (exception) {
            throw exception
        }
    }

    async updateBrand(id,data){
        try {
            let updBrand = await BrandModel.findByIdAndUpdate(id,{
                $set:data
            })

            return updBrand
        } catch (exception) {
            throw exception 
        }
    }

    async deleteBrand(id){
        try {
            let brand = await BrandModel.findByIdAndDelete(id)
            return brand
        } catch (exception) {
            throw exception
        }
    }

    async getBrandFromHome(){
        try {
            let homeBrand = await BrandModel.find({
                status:"active"
            })

            return homeBrand
        } catch (exception) {
            throw exception
        }
    }
}
const brandSvc = new BrandServices()
module.exports = brandSvc
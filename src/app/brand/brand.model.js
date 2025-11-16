const mongoose = require("mongoose")

const BrandSchema = new mongoose.Schema({
    titile:{
        type:String,
        min:3,
        unique: true,
        require: true
    },
    createdBy:{
        type : mongoose.Types.ObjectId,
        ref:"User",
        require: true,
        default : null
    },
    slugify:{
        type :String,
        require: true
    },
    image:{
        type : String,
        require: true
    },
    status:{
        type : String,
        enum:["active","inactive"],
        default:"inactive",
        require : true
    }
},{
    timestamps : true,
    autoCreate: true,
    autoIndex: true
})

const BrandModel = mongoose.model("Brand",BrandSchema)

module.exports = BrandModel
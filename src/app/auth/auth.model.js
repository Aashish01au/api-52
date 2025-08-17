const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        min:3,
        max:35,
         require : true
    },
    email:{
        type : String,
        unique:true,
        require: true
    },
    role:{
        type : String,
        enum : ["admin","seller","customer"],
        require : true,
        default : "customer"
    },
    address:{
        type :String,
        require : true
    },
    phone:{
        type : String,
        require:true
    },
    password:String,
    token:String,
    image:String,
    forgetToken : String,
    validateTill : Date,
    status:{
        type : String,
        enum:["active","inactive"],
        require: true,
        default: "inactive"
    }

},{
    timestamps : true,
    autoCreate:true,
    autoIndex: true
})


const UserModel = mongoose.model("User",UserSchema)

module.exports = UserModel
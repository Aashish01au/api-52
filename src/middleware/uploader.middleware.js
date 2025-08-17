const multer = require("multer")
const fs = require("fs")
const myStorage = multer.diskStorage({
    diskStorage:(req,file,cb)=>{
        let path = "./public/uploaders/"
        if(!fs.existsSync(path)){
            fs.mkdirSync(path,{recursive:true})
        }
        cb(null,path)
    },
    filename:(req,file,cb)=>{
        let ext = (file.originalname.split(".")).pop()
        let name = Date.now()+"."+ext
        cb(null,name)
    }
})

const imageFilter=(req,file,cb)=>{
    let allowed = ["jpeg","png","svg","jpg","webp","bmp","gif"]
    let ext = (file.originalname.split(".")).pop()

    if(allowed.includes(ext.toLowerCase())){
        cb(null,true)
    }else{
        cb({code:401,message:"File type not Supported!!!"},null)
    }
}

const uploaders = multer({
    storage:myStorage,
    fileFilter:imageFilter,
    limits :{
        fileSize:5000000
    }
})

module.exports = uploaders
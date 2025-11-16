const checkPermission = (checkRole)=>{
    return (req,res,next)=>{
        try {
            let user = req.authUser
            console.log(user)
        if(typeof checkRole ==="string" && user.role !==checkRole.role){
            next({code:401,message:"you do not have previllage to access the system"})
        }else if(typeof checkRole ==="object" && !checkRole.includes(user.role)){
            next({code:401,message:"you do not have previllage to access the systems"})
        }else{
            console.log(user)
            next()
        }
        } catch (exception) {
            throw exception
        }
    }
}

module.exports = checkPermission
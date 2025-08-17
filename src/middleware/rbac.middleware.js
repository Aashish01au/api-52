const checkPermission = (checkRole)=>{
    return (req,res,next)=>{
        try {
            let user = req.authUser
    console.log(user)
            if(typeof checkRole==="string" && user.role.toLowerCase() !==checkRole.role.toLowerCase()){
                next({code:403, message:"You donot have permission To access the system"})
            } else if(typeof checkRole==="object" && !(checkRole.includes(user.role.toLowerCase()))){
                next({code:403, message :"You do not have pervilliage to access the system"})
            }else{
                next()
            }
        } catch (exception) {
            throw exception
        }
    }
}

module.exports = checkPermission
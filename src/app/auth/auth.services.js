const UserModel = require("./auth.model")
require("dotenv").config()
class AuthService{
      async  storeuser(data){
        try {
            let user = new UserModel(data)
            return await user.save()
        } catch (exception) {
            throw exception
        }
      }

      async findUserByFilter(filter={}){
        try {
          let userDetails = await UserModel.find(filter)
          return userDetails
        } catch (exception) {
          throw exception
        }
      }

      async updateUser(id,data){
        try {
          let update = await UserModel.findByIdAndUpdate(id,{
            $set:data
          })

          return update
        } catch (exception) {
          throw exception
        }
      }

      async getResetMessage(name,token){
        try {
          return `
          <h1>Dear ${name}</h1><br>
          <a href="${process.env.FRONT_END_URL}/reset-password/${token}" ></a>
          `
        } catch (exception) {
          throw exception
        }
      }

}

const authSvc = new AuthService()
module.exports = authSvc
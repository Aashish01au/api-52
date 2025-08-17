const http = require("http")
const app = require("./src/config/exxpress.config")
const server = http.createServer(app)

server.listen(9000,"localhost",(error)=>{
    if(!error){
        console.log("Server is running on port number 9000")
        console.log("Browse server at http://localhost:9000/")
        console.log("Press Ctrl + C to disconnect the serrver...")
    }
})
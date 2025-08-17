const generateRandomString = (len=100)=>{
    try {
        let char = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJHKMNOPQRSTUVWXYZ"
        let length = char.length
        let random = ""
        for(i=0;i<len;i++){
            let position = Math.floor(Math.random()*(length-1))
            random += char[position]
        }

        return random
    } catch (exception) {
        throw exception
    }
}

module.exports = generateRandomString
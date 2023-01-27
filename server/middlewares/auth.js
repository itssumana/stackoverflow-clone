import jwt from 'jsonwebtoken'

const auth = (req,res,next) => {
    //next is a callback function which allows every controller to be executed
    //only if this auth fn is satisfied the controllers are allowed to be executed

    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        let decodeData = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decodeData)
        req.userId = decodeData?.id //we r setting a new value, userId to the req
        next()
    } catch (error) {
        // res.status(404).json('')
        console.log(`middleware error ${error}`)
    }
}

export default auth
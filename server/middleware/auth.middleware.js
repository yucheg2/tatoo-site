const tokenService = require("../service/tokenService")

module.exports = async (req,res, next) => {
    if(req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers?.authorization.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized" 
            })
        }

        const data = tokenService.validateAccess(token)

        if (!data) {
            return res.status(401).json({
                message: "Unauthorized" 
            })
        }

        req.user = data 

        next()
    } catch (error) {
        res.status(401).json({
            message: "asdsd",
            error
        })
    }
}

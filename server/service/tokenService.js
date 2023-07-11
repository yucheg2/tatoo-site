const jwt = require("jsonwebtoken")
const config = require("config")
const Token = require("../models/Token")

class TokenService {
    generate (payload) {
        const accessToken = jwt.sign(
            payload,
            config.get("accessKey"),
            {
                expiresIn: "1h"
            }
        )

        const refreshToken = jwt.sign(
            payload,
            config.get("refreshKey")
        )

        return { accessToken, refreshToken, expiresIn: 3600}
    }

    async save (userId, refreshToken) {
        const tokenExist = await Token.findOne({user: userId})

        if (tokenExist) {
            tokenExist.refreshToken = refreshToken
            return tokenExist.save()
        }

        const token = await Token.create({ user:userId, refreshToken})
        return token
    }

    
    validateRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, config.get("refreshKey"))
        } catch (e) {
            return null
        }
    }

    validateAccess(accessToken) {
        try {
            return jwt.verify(accessToken, config.get("accessKey"))
        } catch (e) {
            return null
        }
    }

    findInDB(refreshToken) {
        try {
            return Token.findOne({refreshToken})
        } catch (error) {
            return null
        }
    }
}

module.exports = new TokenService
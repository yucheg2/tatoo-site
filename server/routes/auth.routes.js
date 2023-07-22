const express = require("express")
const {check, validationResult} = require("express-validator")
const Users = require("../models/Users")
const bcrypt = require("bcryptjs")
const tokenService = require("../service/tokenService")
const Masters = require("../models/Masters")


const router = express.Router({
    mergeParams: true
})

router.post("/signUp", [
    check("email","Email введен не коректно").isEmail(),
    check("password", "Пароль введен не коректно").isLength({
        min: 8
    }),
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                        errors: errors.array()
                    }
                })
            }
    
            const {email, password, ...rest} = req.body
    
            const userExist = await Users.findOne({email})
    
            if (userExist) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_EXISTS",
                        code: 400
                    }
               })
            }
    
            const hashedPassword = await bcrypt.hash(password, 12)
    
            const user = await Users.create({
                email, 
                password: hashedPassword,
                ...rest
            })
    
            const tokens = tokenService.generate({
                _id: user._id
            })
            
            await tokenService.save(user._id, tokens.refreshToken)
    
            res.status(201).send({
                ...tokens,
                userId: user._id
            }) 
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :(",
                error
            })
        }
    }
]) 

router.post("/signInWithPassword", [
    check("email","Email введен не коректно").isEmail(),
    check("password", "Пароль введен не коректно").isLength({
        min: 8
    }),
    async (req,res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                        errors: errors.array()
                    }
                })
            }

            const {email, password, isMaster} = req.body 

            const user = isMaster ? await Masters.findOne({email}) : await Users.findOne({email}) 

            if (!user) {
                return res.status(400).send({
                    error: {
                        message: "EMAIL_NOT_FOUND",
                        code: 400
                    }
                })
            }

            const passwordEqual = await bcrypt.compare(password, user.password)

            if (!passwordEqual) {
                return res.status(400).send({
                    error: {
                        message: "INVALID_PASSWORD",
                        code: 400
                    }
                })
            }

            const tokens = await tokenService.generate({_id: user._id})

            await tokenService.save(user._id, tokens.refreshToken)

            res.status(200).send({...tokens, userId: user._id})
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :(",
                error
            })
        }
    }
])

router.post("/token", async (req, res) => {
    const {refresh_token: refreshToken} = req.body

    const data = await tokenService.validateRefresh(refreshToken)
    const dbToken = await tokenService.findInDB(refreshToken)
    console.log(data, dbToken)

    if (!data || !dbToken || data._id !==dbToken?.user.toString()) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const tokens = await tokenService.generate({_id: dbToken.user})

    await tokenService.save(dbToken.user, tokens.refreshToken)

    res.status(200).send({...tokens, userId: dbToken.user})
})

module.exports = router
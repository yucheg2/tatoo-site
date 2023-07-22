const express = require("express")
const path = require("path")
const fs = require("fs")
const Tatoos = require("../models/Tatoose")
const Sizes = require("../models/Sizes")
const Styles = require("../models/Styles")
const Places = require("../models/Places")
const authMiddleware = require("../middleware/auth.middleware")
const Masters = require("../models/Masters")

const router = express.Router({
    mergeParams: true
})

router.route("/tatoos")
    .get( async (req, res) => {
        try {
            const tatoos = await Tatoos.find()
            res.status(200).send( tatoos )
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка :("
            })
        }
    })
    .post(authMiddleware, async (req,res) => {
        try {
            const masterId = req.user._id
            const payload = req.body

            
            const master = await Masters.findById(masterId)
            if (!master) {
                return res.status(401).json({
                    message: "Unauthorized" 
                })
            }
            const temporeryPath = path.join(__dirname, "..", "sketches", masterId, "temporery")
            const dirPath = path.join(__dirname, "..", "sketches", payload.style)
            if (fs.existsSync(temporeryPath)) {
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath)
                }
                const imgName = fs.readdirSync(temporeryPath)[0]
                const newImgName = Date.now()+imgName
                const oldPath = path.join(temporeryPath, imgName)
                const newPath = path.join(dirPath, newImgName)
                return fs.rename(oldPath, newPath, async function (err) {
                    if (err) throw err
                    const tatoo = await Tatoos.create({
                        ...payload,
                        src: `sketches\\${payload.style}\\${newImgName}`
                    })
                    res.status(201).send(tatoo)
                })
            } 
            res.json({
                error: {
                    message: "Файл не найден",
                    code: 400
                }
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: "На сервере произошла ошибка :("
            })
        }
    })

router.get("/sizes",async (req, res) => {
    try {
        const sizes = await Sizes.find()
        res.status(200).send( sizes )
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка :("
        })
    }
})

router.get("/styles",async (req, res) => {
    try {
        const styles = await Styles.find()
        res.status(200).send( styles )
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка :("
        })
    }
})

router.get("/places",async (req, res) => {
    try {
        const places = await Places.find()
        res.status(200).send( places )
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка :("
        })
    }
})


module.exports = router
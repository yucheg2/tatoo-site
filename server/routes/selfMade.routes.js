const express = require("express")
const path = require("path")
const fs = require("fs")
const fileMiddleware = require("../middleware/file.middleware")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router({
    mergeParams: true
})

router.post("/upload", authMiddleware, fileMiddleware.single("sketch"), (req,res) => {
    try {
        if (req.file) {
            res.json(req.file)
        }
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка :(",
            error
        })
    }
})
router.delete("/temporery/:userId", async (req, res) => {
    try {
        const {userId} = req.params

        const temporeryPath = path.join(__dirname, "..", "sketches", userId, "temporery")
        if (fs.existsSync(temporeryPath)) {
            fs.rmSync(temporeryPath, { recursive: true, force: true })
            return res.send(null)
        } 
        res.status(400).json({
            error: {
                message: "Файл не найден",
                code: 400
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка :(",
            error
        })
    }
})

router.route("/storage/:userId")
    .post((req,res)=> {
        try {
            const {userId} = req.params
    
            const temporeryPath = path.join(__dirname, "..", "sketches", userId, "temporery")
            const storePath = path.join(__dirname, "..", "sketches", userId, "store")
            if (fs.existsSync(temporeryPath)) {
                if (!fs.existsSync(storePath)) {
                    fs.mkdirSync(storePath)
                }
                const imgName = fs.readdirSync(temporeryPath)[0]
                const newImgName = Date.now()+imgName
                const oldPath = path.join(temporeryPath, imgName)
                const newPath = path.join(storePath, newImgName)
                return fs.rename(oldPath, newPath, function (err) {
                    if (err) throw err
                    res.send(`sketches\\${userId}\\store\\${newImgName}`)
                })
            } 
            res.json({
                error: {
                    message: "Файл не найден",
                    code: 400
                }
            })
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :(",
                error
            })
        }
    })
    .put((req,res)=>{
        try {
            const {fileName} = req.body
            const {userId} = req.params

            const filePath = path.join(__dirname, "..", "sketches", userId, "store", fileName)
            
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
                return res.send(null)
            }
            res.status(400).json({
                error: {
                    message: "Файл не найден",
                    code: 400
                }
            })
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :(",
                error
            })
        }
    })
    .delete((req,res) => {
        try {
            const {userId} = req.params

            const storePath = path.join(__dirname, "..", "sketches", userId, "store")
            if (fs.existsSync(storePath)) {
                fs.rmSync(storePath, { recursive: true, force: true })
                return res.send(null)
            } 
            res.status(400).json({
                error: {
                    message: "Файл не найден",
                    code: 400
                }
            })
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :(",
                error
            })
        }
    })

router.route("/order/:userId/:date")
    .post(async (req,res)=> {

        try {

            const {userId, date} = req.params
            const {fileName} = req.body
        
            const storePath  = path.join(__dirname, "..", "sketches", userId, "store")
            const orderPath = path.join(__dirname, "..", "sketches", userId, "order")
            if (fs.existsSync(storePath)) {
                if (!fs.existsSync(orderPath)) {
                    fs.mkdirSync(orderPath)
                }
                if (!fs.existsSync(path.join(orderPath, date))) {
                    fs.mkdirSync(path.join(orderPath, date))
                }
                const oldPath = path.join(storePath, fileName)
                const newPath = path.join(orderPath, date, fileName)
                return fs.rename(oldPath, newPath, function (err) {
                    if (err) throw err
                    res.send(`sketches\\${userId}\\order\\${date}\\${fileName}`)
                })
            } 
            res.json({
                error: {
                    message: "Файл не найден",
                    code: 400
                }
            })
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :(",
                error
            })
        }
    })
    .delete((req,res) => {
        try {
            const {userId, date} = req.params

            const orderPath = path.join(__dirname, "..", "sketches", userId, "order", date)
            if (fs.existsSync(orderPath)) {
                fs.rmSync(orderPath, { recursive: true, force: true })
                return res.send(null)
            } 
            res.status(400).json({
                error: {
                    message: "Файл не найден",
                    code: 400
                }
            })
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :(",
                error
            })
        }
    })
    .put(async (req,res)=> {
        try {
            const {userId, date} = req.params
            const {fileName} = req.body
            const storePath  = path.join(__dirname, "..", "sketches", userId, "store")
            const orderPath = path.join(__dirname, "..", "sketches", userId, "order", date)
            
            if (fs.existsSync(storePath)) {
                
                const oldPath = path.join(storePath, fileName)
                const newPath = path.join(orderPath, fileName)
                fs.rename(newPath, oldPath, function (err) {
                    if (err) throw err
                })
                
                return res.send(null)
            } 
            res.json({
                error: {
                    message: "Файл не найден",
                    code: 400
                }
            })
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :(",
                error
            })
        }})
module.exports = router
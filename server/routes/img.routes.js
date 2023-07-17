const express = require("express")
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

module.exports = router
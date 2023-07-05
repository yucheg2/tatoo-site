const express = require("express")
const Tatoos = require("../models/Tatoose")
const Sizes = require("../models/Sizes")
const Styles = require("../models/Styles")
const Places = require("../models/Places")

const router = express.Router({
    mergeParams: true
})

router.get("/tatoos", async (req, res) => {
    try {
        const tatoos = await Tatoos.find()
        res.status(200).send( tatoos )
    } catch (e) {
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
const express = require("express")
const auth = require("../middleware/auth.middleware")
const Masters = require("../models/Masters")

const router = express.Router({
    mergeParams: true
})

router.get("/", async (req, res) => {
    try {
        const masters = await Masters.find()
        res.status(200).send( masters )
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка :("
        })
    }
})

router

router.route("/:masterId/order/:date")
    .delete( auth, async(req, res) => {
        try {
            const {masterId, date} = req.params

            const master = await Masters.findById(masterId)
        
            if (master.order && !master.order[date]) {
                return res.status(400).send({
                    message: "Order not found"
                })
            }

            if ( req.user._id !== master.order[date].person._id) {
                return res.status(401).json({
                    message: "Unauthorized" 
                })
            }

            delete master.order[date]

            await Masters.findByIdAndUpdate(masterId, {...master})
        
            res.send("Заказ удален")
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :(",
                error
            })
        }
    })
    .put( auth, async(req, res) => {
        try {

            const {masterId, date} = req.params

            const master = await Masters.findById(masterId)

            const payload = req.body

            if (payload.person._id !== req.user._id) {
                return res.status(401).json({
                    message: "Unauthorized" 
                })
            }
            if (master.order && master.order[date]) {
                return res.send("Мастер в этот день зянят.")
            }

            const m = await Masters.findByIdAndUpdate(masterId,{
                order: {...master.order,[date]:payload}
                
            }, {new:true})

            res.status(201).send(m)
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :(",
                error
            })
        }
    })

router.put("/:masterId/rate", auth, async (req, res) => {
    try {
        const {masterId} = req.params
        const master = await Masters.findByIdAndUpdate(masterId, {
            rate: req.body.newRate
        })
        res.send(master)
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка :(",
            error
        })
    }
})

router.route("/:masterId/comments")
    .get(async (req,res) => {
        try {
            const {masterId} = req.params

            const {comments} = await Masters.findById(masterId)

            res.send(comments)
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :(",
                error
            })
        }
    })
    .post(auth, async (req, res) => {
        try {
            const {masterId} = req.params
            const payload = req.body
            const m = await Masters.findById(masterId)

            if (req.user._id !== payload.name) {
                return res.status(401).json({
                    message: "Unauthorized" 
                })
            }
            const comments = m.comments ? m.comments : {}
            const master = await Masters.findByIdAndUpdate(masterId,{
                comments: {
                    ...comments,
                    [Date.now()]: req.body
                }
            })

            res.send(payload)
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :(",
                error
            })
        }
    })

module.exports = router
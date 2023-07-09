const express = require("express")
const auth = require("../middleware/auth.middleware")
const Users = require("../models/Users")


const router = express.Router({
    mergeParams: true
})

router.route("/:userId")
    .get( async (req, res) => {
        try {
            const {userId} = req.params

            const user = await Users.findById(userId)
    
            res.send(user)
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :("
            })
        }
    })
    .put( auth, async(req, res)=>{
        try {
            const {userId} = req.params
        
            if (userId !== req.user._id) {
                return res.status(401).json({
                    message: "Unauthorized" 
                })
            }
            
            const user = await Users.findByIdAndUpdate(
                userId,
                req.body,
                {new:true}
            )

            res.send(user)
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :("
            })
        }
    })

router.route("/:userId/order/:date")
    .delete( auth, async(req, res) => {
        try {
            const {userId, date} = req.params
            
            if (userId !== req.user._id) {
                return res.status(401).json({
                    message: "Unauthorized" 
                })
            }
            
            const user = await Users.findById(userId)
            
            if (!user.order[date]) {
                return res.status(400).send({
                    message: "Order not found"
                })
            }
            
            delete user.order[date]
    

            await Users.findByIdAndUpdate(userId, {...user})
        
            res.send(user)
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :("
            })
        }
    })
    .put(auth, async(req, res) => {
        try {

            const {userId, date} = req.params

            const user = await Users.findById(userId)

            const payload = req.body

            if (userId !== req.user._id) {
                return res.status(401).json({
                    message: "Unauthorized" 
                })
            }
            if (user.order && user.order[date]) {
                return res.send("Вы уже записаны на этот день.")
            }

            const u = await Users.findByIdAndUpdate(userId,{
                order: {...user.order,[date]:payload}
                
            }, {new:true})

            res.status(201).send(u)
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка :(",
                error
            })
        }
    })

module.exports = router
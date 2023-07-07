const express = require("express")

const router = express.Router({
    mergeParams: true
})

router.use("/info",require("./info.routes"))
router.use("/masters", require("./masters.routes"))
router.use("/auth", require("./auth.routes"))

module.exports = router
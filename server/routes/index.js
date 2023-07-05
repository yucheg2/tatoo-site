const express = require("express")

const router = express.Router({
    mergeParams: true
})

router.use("/info",require("./info.routes"))
router.use("/masters", require("./masters.routes"))

module.exports = router
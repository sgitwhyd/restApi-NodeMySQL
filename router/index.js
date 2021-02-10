const router = require('express').Router()
const userRoute = require('./userRouter')


router.use('/', userRoute)

module.exports = router

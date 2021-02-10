const router = require('express').Router()
const { register, uploadFotoUser, getUsers } = require('../controller/usersController')
const { checkUser } = require('../middleware/checkUser')
const { upload } = require('../middleware/upload')
const { validateImage } = require('../middleware/validationImage')

router.post('/register', register)
router.post('/upload/:id', upload, validateImage, uploadFotoUser)
router.get('/users', getUsers)


module.exports = router

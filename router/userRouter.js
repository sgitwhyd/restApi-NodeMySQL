const router = require('express').Router()
const { register, uploadFotoUser, getUsers } = require('../controller/usersController')
const { upload } = require('../middleware/upload')
const { validateImage } = require('../middleware/validationImage')


// HANDLE REGISTER USER
router.post('/register', register)
// HANDLE UPDATE PROFILE
router.post('/upload/:id', upload, validateImage, uploadFotoUser)
// HANDLE GET USERS
router.get('/users', getUsers)


module.exports = router

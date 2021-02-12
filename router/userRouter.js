const router = require('express').Router()
const { register, uploadFotoUser, getUsers, handleLogin } = require('../controller/usersController')
const { upload } = require('../middleware/upload')
const { validateImage } = require('../middleware/validationImage')
// middleware
const { checkAuth } = require('../middleware/checkAuth')

// HANDLE LOGIN USER
router.post('/login', handleLogin)
// HANDLE REGISTER USER
router.post('/register', register)
// HANDLE UPDATE PROFILE
router.post('/upload/:id', checkAuth, upload, validateImage, uploadFotoUser)
// HANDLE GET USERS
router.get('/users', getUsers)


module.exports = router

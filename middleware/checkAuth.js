const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports.checkAuth = async (req, res, next) => {
    let token = req.header('auth-token')

    if (!token) {
        return res.status(404).json({
            status: false,
            error: 'Token Not Found'
        })
    }

    await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                status: false,
                error: 'Invalid or expired Token'
            })
        }
        req.id = decoded
        next()
    })
}
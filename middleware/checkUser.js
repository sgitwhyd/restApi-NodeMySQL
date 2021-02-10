const User = require("../models/usersModels")

module.exports.checkUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.findOne({ where: { id: id } })
        if (user) {
            next()
        } else {
            return res.json({
                status: false,
                msg: "User Id Not Found"
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            msg: "Someting Error when upload file. Please Contact Developer"
        })
    }
}
const User = require('../models/usersModels')
const fs = require('fs')
const bcrypt = require('bcrypt')

module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const checkUser = await User.findOne({ where: { email: email } })
        if (checkUser) {
            return res.status(400).json({
                status: false,
                msg: "Register Failed. Email Exist"
            })
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    // Store hash in your password DB.
                    const user = new User({
                        name: name,
                        email: email,
                        password: hash
                    })

                    await user.save()
                    return res.status(200).json({
                        status: true,
                        msg: "Register Successfully"
                    })
                });
            });
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.uploadFotoUser = async (req, res) => {
    try {
        let id = req.params.id
        let image = req.file.filename
        let imagePath = `http://${req.headers.host}/${req.file.path}`
        const user = await User.findOne({ where: { id: id } })
        if (!user) {
            let path = req.file.path
            await fs.unlinkSync(path)
            return res.json({
                status: false,
                msg: "User Id Not Found"
            })
        } else if (user.image !== null) {
            let delPath = `public/uploads/${user.image}`
            await fs.unlinkSync(delPath)
        }

        await User.update({
            image: image,
            imagePath: imagePath
        }, { where: { id: id } })


        return res.status(200).json({
            status: true,
            msg: "Profile Updated Successfully",
            data: imagePath
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        return res.json({
            data: users
        })
    } catch (error) {
        console.log(error)
    }
}
const User = require('../models/usersModels')
const fs = require('fs')
const bcrypt = require('bcrypt')
// validation
const { registerValidation, loginValidation } = require("../middleware/UserValidation")
const jwt = require('jsonwebtoken')
require('dotenv').config()



module.exports.register = async (req, res) => {
    try {
        // REGISTER VALIDATE
        const { error } = registerValidation(req.body)
        if (error) return res.status(400).json({
            status: false,
            error: error.details[0].message
        })

        // CHECK USER IN DATABASE
        const emailExist = await User.findOne({ where: { email: req.body.email } })
        if (emailExist) return res.status(400).json({
            status: false,
            error: "Email Exist"
        })

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, async function (err, hash) {
                // Store hash in your password DB.
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                })

                await user.save()
                return res.status(200).json({
                    status: true,
                    msg: "Register Successfully"
                })
            });
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: false,
            error: "Register Error. Please Contact Developers"
        })
    }
}


module.exports.handleLogin = async (req, res) => {
    try {

        // LOGIN VALIDATION
        const { error } = loginValidation(req.body)
        if (error) return res.status(400).json({
            status: false,
            error: error.details[0].message
        })

        // CHECK EMAIL IN DATABASE
        const emailExist = await User.findOne({ where: { email: req.body.email } })
        if (emailExist) {
            // COMPARE PASSWORD IN DATABASE AND FROM FORM LOGIN
            await bcrypt.compare(req.body.password, emailExist.password, async (err, isMatch) => {
                if (isMatch) {
                    const data = {
                        id: emailExist.id
                    }
                    // INSTASIASI TOKEN
                    await jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
                        if (token) {
                            return res.status(200).json({
                                status: true,
                                msg: "Login Successfully",
                                token: token
                            })
                        }

                        if (err) {
                            return res.status(400).json({
                                status: false,
                                error: "Problem With the token"
                            })
                        }
                    })
                }
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            error: "Something Error When Login. Please Contact Your Developer"
        })
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
            return res.status(404).json({
                status: false,
                error: "User Id Not Found"
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
            msg: "Profile Updated Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: false,
            error: "Update Profile Error. Please Contact Your Developer"
        })
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

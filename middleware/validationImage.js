const fs = require('fs')

module.exports.validateImage = async (req, res, next) => {
    try {
        let image = req.file
        let imagePath = image.path


        // CHECK IMAGE FILE VALIDATE 
        if (!(image.mimetype).includes('jpeg') && !(image.mimetype).includes('png')
            && !(image.mimetype).includes('jpg')) {
            await fs.unlinkSync(imagePath)
            return res.json({
                status: false,
                msg: 'failed. Allowed Image format jpeg, png, jpg'
            })
        }

        // CHECK IMAGE SIZE
        if (image.size > 1024 * 1024) {
            await fs.unlinkSync(imagePath)
            return res.json({
                status: false,
                msg: 'file too large'
            })
        }

        next()
    } catch (error) {
        console.log(error)
        return res.json({
            status: false,
            error: 'Validate Error. Please Contact Developers'
        })
    }
}
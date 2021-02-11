const fs = require('fs')

module.exports.validateImage = async (req, res, next) => {
    try {

        let image = req.file

        // CHECK IF NO IMAGE FILE IS UPLOAD
        if (!image) {
            return res.status(400).json({
                status: false,
                error: 'No Image upload'
            })
        }

        // CHECK IMAGE FILE VALIDATE 
        if (!(image.mimetype).includes('jpeg') && !(image.mimetype).includes('png')
            && !(image.mimetype).includes('jpg')) {
            await fs.unlinkSync(image.path)
            return res.json({
                status: false,
                error: 'failed. Allowed Image format jpeg, png, jpg'
            })
        }

        // CHECK IMAGE SIZE
        if (image.size > 1024 * 1024) {
            await fs.unlinkSync(image.path)
            return res.json({
                status: false,
                error: 'file too large. Max 1 MB'
            })
        }

        next()
    } catch (error) {
        console.log(error)
        return res.json({
            status: false,
            error: 'Image Validate Error. Please Contact Developers'
        })
    }
}
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    }
})

const upload = multer({
    storage: storage,
    limits: 1024 * 1024
}).single('profile');

module.exports = {
    upload
}
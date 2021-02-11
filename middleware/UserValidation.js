const joi = require('joi')

module.exports.registerValidation = (data) => {
    const validateSchema = joi.object({
        name: joi.string().min(6).max(20).required(),
        email: joi.string().email().min(6).required(),
        password: joi.string().min(6).alphanum().required()
    });

    return validateSchema.validate(data)
}
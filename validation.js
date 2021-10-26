const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const createValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        code: Joi.string().min(1).required(),
        price: Joi.number().min(1).required()
    });
    return schema.validate(data)
}

const editValidation = data => {
    const schema = Joi.object({
		id: Joi.objectId().required(),
        name: Joi.string().min(1).required(),
        code: Joi.string().min(1).required(),
        price: Joi.number().min(1).required()
    });
    return schema.validate(data)
}

const deleteValidation = data => {
    const schema = Joi.object({
		id: Joi.objectId().required()
    });
    return schema.validate(data)
}

module.exports.createValidation = createValidation
module.exports.editValidation = editValidation
module.exports.deleteValidation = deleteValidation
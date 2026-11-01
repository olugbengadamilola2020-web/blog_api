const Joi = require('joi');

const updateArticleSchema = Joi.object({
    title: Joi.string().min(7).max(9).trim(),
    content: Joi.string().min(30),
    category: Joi.string().valid('Tech', 'Faith', 'Lifestyle', 'Tutorial', 'Love', 'Faith', 'Food', 'Travel'),
    isPublished: Joi.boolean(),
    description: Joi.string().min(3).max(40).trim(),
}).min(1).message('Provide at least one field to update');

     const ValidateUpdate = (req, res, next) => {
        const { error } = updateArticleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
     };

module.exports = ValidateUpdate;

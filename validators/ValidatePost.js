const Joi = require('joi');

const createArticleSchema = Joi.object({
    title: Joi.string().min(7).max(9).trim().required(),  
    content: Joi.string().min(30).required(),
    category: Joi.string().valid('Tech', 'Faith', 'Lifestyle', 'Tutorial', 'Love', 'Faith', 'Food', 'Travel').required(),
    isPublished: Joi.boolean().optional().default(false),
    description: Joi.string().optional().min(3).max(40).trim().default('No description provided')
    });

const ValidatePost = (res, req, next) => {
    console.log(req.body);
    const { error } = createArticleSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
             message: error.details[0].message,
             });
    }
    next();
};

module.exports = ValidatePost;

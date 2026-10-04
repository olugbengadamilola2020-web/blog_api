const Joi = require('joi');

const createArticleSchema = Joi.object({
    title: Joi.string()
    .min(7)
    .max(9)
    .trim()
    .required()
    .messages({
        'string.empty': 'Title is required',
        'any.required': 'Title is required'
    }),

content: Joi.string()
.min(30)
.required()
.messages({
    'string.empty': 'Content is required',
    'any.required': 'Content is required'
}),

category: Joi.string()
.valid('Tech', 'Faith', 'Lifestyle', 'Tutorial', 'Love', 'Faith', 'Food', 'Travel')
.required()
.messages({
    'any.only': 'Category must be one of Tech, Faith, Lifestyle, Tutorial, Love, Faith, Food, Travel',
    'any.required': 'Category is required'
}),

author: Joi.string()
.min(2)
.max(10)
.trim()
.default('Guest'),

isPublished: Joi.boolean()
.optional()
.default(false),

description: Joi.string()
.optional()
.min(3)
.max(40)
.trim()
.default('No description provided')

});


const updateArticleSchema = Joi.object({
    title: Joi.string().min(7).max(9).trim(),
    content: Joi.string().min(30),
    category: Joi.string().valid('Tech', 'Faith', 'Lifestyle', 'Tutorial', 'Love', 'Faith', 'Food', 'Travel'),
    author: Joi.string().min(2).max(10).trim(),
    isPublished: Joi.boolean(),
    description: Joi.string().min(3).max(40).trim()
}).min(1).messages({
    "Provide at least one field to update"
});


module.exports = {
    createArticleSchema,
    updateArticleSchema
};


const Joi = require('joi');

const ArticleModel = require('../models/article.models.js');


const postArticle = async (req, res, next) => {

    const creatArticleSchema = Joi.object({
        title: Joi.string().min(7).required(),
        content: Joi.string().min(30).required(),
        category: Joi.string().valid('Tech', 'Faith', 'Lifestyle', 'Tutorial', 'Love', 'Faith', 'Food', 'Travel').required(),
        author: Joi.string().optional().default("Guest"),
        isPublished: Joi.boolean().optional().default(false),
        description: Joi.string().optional().default('No description provided'),
    });

    
    const { error ,value } = createArticleSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details.map(d => d.message).join(', ')
        });
    }

    try {
        const { title, content,category, author, isPublished, description } = value;
         const newArticle = new ArticleModel({
            title,
            content,
            category,
            author,
            isPublished,
            description,
         });
         await newArticle.save();

         res.status(200).json({ 
            message: "Article created",
            data: newArticle,
        })
    } catch (error) {

        console.error(error)
        next(error);
    }
};

const getAllArticle = async (req, res, next) => {
    const { limit = 10, page = 1 } = req.query;

    const skip = (page - 1) * limit;


    try {
       const articles = await ArticleModel.find()
       .sort({ createdAt: -1 })
       .limit(limit)
       .skip(skip);

       return res.status(200).json({
        message: "Articles fetched",
        data: articles,
       });

    } catch (error) {
        console.error(error)
        next(error);
    }
};

const getArticleById = async (req, res, next) => {

    try {
        const articles = await ArticleModel.findById(req.params.id);

        if(!articles){
            res.status(404).json({
                message: `Article with ${req.params.id} not found`
            })
        }

        return res.status(200).json({
            message: "Article fetched",
            data: articles,
        })
    } catch (error) {
        console.error(error)
        next(error);
    }
};

const updateArticleById = async (req, res, next) => {

    const updateArticleSchema = Joi.object({
        title: Joi.string().min(7),
        content: Joi.string().min(30),
        category: Joi.string().valid('Tech', 'Faith', 'Lifestyle', 'Tutorial', 'Love', 'Faith', 'Food', 'Travel'),
        author: Joi.string(),
        isPublished: Joi.boolean(),
        description: Joi.string(),
    }).min(1);

    const { error, value } = updateArticleSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details.map(d => d).join(', ')
        });
    }
     try {

        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            req.params.id,
            {...value },
        {
            new: true,
            runValidators: true,
        } 
      );

      if(!updatedArticle){
        res.status(404).json({
            message: "article not found"
        });
      }

      
        return res.status(200).json({
            message: "article updated",
            data: updatedArticle,
        });
    
    } catch (error) {
        console.error(error)
        next(error);
    }
};

const deleteArticleById = async (req, res, next) => {
    try {
    const article = await ArticleModel.findByIdAndDelete(req.params.id);

    if (!article) {
        return res.status(404).json({
            message: "article not found",
        });
    }

    return res.status(200).json({
        message: "article deleted",
    });

    } catch (error) {
        console.error(error)
        next(error);
    }
};


const searchArticles = async (req, res, next) => {
    try {
        const { query } = req.query;

        if (!query)
          return res.status(400).json({
        message: 'Query required'
    });


        const articles = await ArticleModel.find({
            $text: {
                $search: query
            }
        });
        return res.status(200).json({
            message: "Articles searched",
            data: articles
        });
    } catch (error) {
        console.error(error);
        next(NativeError);
    }
};

module.exports = {
    postArticle,
    getAllArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById,
    searchArticles,
};
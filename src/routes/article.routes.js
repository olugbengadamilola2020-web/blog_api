const express = require("express");

const {
    postArticle, 
    getAllArticle, 
    getArticleById, 
    updateArticleById, 
    deleteArticleById,
    searchArticles, 
} = require("../controllers/article.controller.js");

const ValidatePost = require('../validators/ValidatePost.js');
const ValidateUpdate = require("../validators/ValidateUpdate.js");
const requireAuth = require('../middleware/requireAuth.js');

const router = express.Router();

router.use(requireAuth);

router.post("/articles",  ValidatePost, postArticle);

router.get("/articles",  getAllArticle);

router.get("/articles/:id", getArticleById);

router.put("/articles/:id", ValidateUpdate, updateArticleById);

router.delete("/articles/:id", deleteArticleById);

router.get("/articles/search/:query", searchArticles);

module.exports = router;
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


router.post("/articles",  ValidatePost, requireAuth, postArticle);

router.get("/articles", requireAuth, getAllArticle);

router.get("/articles/:id", requireAuth, getArticleById);

router.put("/articles/:id", ValidateUpdate, requireAuth, updateArticleById);

router.delete("/articles/:id", requireAuth, deleteArticleById);

router.get("/articles/search/:query", requireAuth, searchArticles);

module.exports = router;
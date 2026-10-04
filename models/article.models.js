const { required, valid } = require('joi');
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 7,
    },
    content: {
        type: String,
        required: true,
        minLength: 30,
    },
    category: {
        type: String,
        valid: ('Tech', 'Faith', 'Lifestyle', 'Tutorial', 'Love', 'Food', 'Travel'),
        required: true,
    },
    author: {
        type: String,
        default: 'Guest',
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        default: 'No description provided',
    },
},
    { timestamps: true }
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;

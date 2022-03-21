const express = require('express');
const checkLoggedIn = require('../lib/checkLoggedIn');
const posts = express.Router();

const postController = require('../controllers/post');

// posts.get('/',(req,res)=>res.send('posts toto123'))
posts.get('/', postController.list);
posts.post('/', checkLoggedIn, postController.write);
posts.get('/:id', postController.getPostById, postController.read);
posts.delete('/:id', checkLoggedIn, postController.getPostById, postController.checkOwnPost, postController.remove);
posts.patch('/:id', checkLoggedIn, postController.getPostById, postController.checkOwnPost, postController.update);

module.exports = posts;

const express = require('express');
const checkLoggedIn = require('../lib/checkLoggedIn');
const posts = express.Router();

const postController = require('../controllers/post');

// posts.get('/',(req,res)=>res.send('posts toto123'))
posts.get('/', postController.list);
posts.post('/', checkLoggedIn, postController.write);
posts.get('/:id', postController.checkObjectId, postController.read);
posts.delete('/:id', checkLoggedIn, postController.checkObjectId, postController.remove);
posts.patch('/:id', checkLoggedIn, postController.checkObjectId, postController.update);

module.exports = posts;

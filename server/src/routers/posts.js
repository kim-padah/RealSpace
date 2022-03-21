const express = require('express');
const posts = express.Router();

const postController = require('../controllers/post');

// posts.get('/',(req,res)=>res.send('posts toto123'))
posts.get('/', postController.list);
posts.post('/', postController.write);
posts.get('/:id', postController.checkObjectId, postController.read);
posts.delete('/:id', postController.checkObjectId, postController.remove);
posts.patch('/:id', postController.checkObjectId, postController.update);

module.exports = posts;

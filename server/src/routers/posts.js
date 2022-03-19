const express = require('express');
const posts = express.Router();

const postController = require('../controllers/posts');

//컨트롤러로 추후 분리 예정
// posts.get('/',(req,res)=>res.send('posts toto123'))
posts.get('/', postController.list);
posts.post('/', postController.write);
posts.get('/:id', postController.read);
posts.delete('/:id', postController.remove);
posts.put('/:id', postController.replace);
posts.patch('/:id', postController.update);

module.exports = posts;

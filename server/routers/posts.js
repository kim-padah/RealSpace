const express = require('express');
const posts = express.Router(); 

const printInfo = require('../controllers/posts');


//컨트롤러로 추후 분리 예정
// posts.get('/',(req,res)=>res.send('posts toto123'))
posts.get('/', printInfo)
posts.post('/', printInfo)



module.exports = posts;
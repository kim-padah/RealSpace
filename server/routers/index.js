const express = require('express');
const app = express()

const rootRouter = express.Router();
const postsRouter = require('./posts')

//컨트롤러로 추후에 분리 예정
rootRouter.get('/test', (req,res)=>res.send(`test Succeed`))

rootRouter.use('/posts',postsRouter)




module.exports = rootRouter;
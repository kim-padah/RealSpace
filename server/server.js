const express = require('express')
const morgan = require('morgan');

const rootRouter = require('./routers')

const app = express()
const cors = require('cors');
const logger = morgan('dev');

app.use(logger);
app.use(express.json())//data auto parsing to json-format
app.use(cors())

//Routers
app.use('/', rootRouter)

app.listen(3001, ()=> {
    console.log("Listening on port 3001")
})

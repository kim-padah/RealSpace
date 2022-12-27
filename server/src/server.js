const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql2');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// const rootRouter = require('./routers');
// const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');

require('dotenv').config({
  path: '.env',
});

const app = express();

app.use(morgan('dev')); //logger
app.use(express.json()); //built in body-parser:data parsing to json
app.use(cookieParser());
// app.use(jwtAuthMiddleware);
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id' + connection.threadId);
});

// //Routers
// app.use('/', rootRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

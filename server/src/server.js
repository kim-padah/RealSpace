require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const rootRouter = require('./routers');
const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');

const { PORT, MONGO_URI } = process.env;

const app = express();

app.use(morgan('dev')); //logger
app.use(express.json()); //built in body-parser:data parsing to json
app.use(cookieParser());
app.use(jwtAuthMiddleware);
app.use(cors());

//db
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });
//Routers
app.use('/', rootRouter);

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening on port 3001');
});

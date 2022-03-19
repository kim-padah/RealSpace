require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const rootRouter = require('./routers');

const { PORT, MONGO_URI } = process.env;

const app = express();
const cors = require('cors');
const logger = morgan('dev');

app.use(logger);
app.use(express.json()); //data auto parsing to json-format
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

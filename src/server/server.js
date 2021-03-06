const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const morgan = require('morgan');
const router = require('../routes/router');

const errorHandler = (req, res, next)  => {
  res.status(500).send('No such page');
  next();
};

const startServer = port => {
  app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use('/', router)
    .use(errorHandler);

  app.listen(port);

  console.log('Server was started at https://localhost:' + port);
};

module.exports = startServer;
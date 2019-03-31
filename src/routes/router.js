const express = require('express');
const mainRoute = require('./main/main');
const saveUser = require('./user/saveUser');
const getProducts = require('./products/getProducts');
const getProductById = require('./products/getProductById');
const getUserById = require('./user/getUser');
const createOrder = require('./orders/createOrder');
const saveMultipartImage = require('./image/saveMultipartImage');

const apiRoutes = express.Router();

apiRoutes
  .get('/', mainRoute)
  .get('/products', getProducts)
  .get('/products/:id', getProductById)
  .get('/users/:id', getUserById)
  .post('/users', saveUser)
  .post('/orders/', createOrder)
  .post('/images', saveMultipartImage);

module.exports = apiRoutes;
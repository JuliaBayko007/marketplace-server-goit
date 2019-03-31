const express = require('express');
const mainRoute = require('./main/main');
const createUser = require('./user/createUser');
const getAllProducts = require('./products/getAllProducts');
const getProduct = require('./products/getProduct');
const getUser = require('./user/getUser');
const getOrder = require('./order/getOrder');
const createOrder = require('./order/createOrder');
const createProduct = require('./products/createProduct');
const updateUser = require('./user/updateUser');
const updateProduct = require('./products/updateProduct');


const apiRoutes = express.Router();

apiRoutes
  .get('/', mainRoute)
  .get('/products', getAllProducts)
  .get('/products/:id', getProduct)
  .get('/users/:id', getUser)
  .get('/orders/:id', getOrder)
  .post('/users', createUser)
  .post('/orders', createOrder)
  .post('/products', createProduct)
  .put('/users/:id', updateUser)
  .put('/products/:id', updateProduct);

module.exports = apiRoutes;
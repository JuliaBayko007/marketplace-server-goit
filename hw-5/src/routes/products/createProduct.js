const Product = require('../../db/schemas/product');

const createProduct = (request, response) => {
  const product = request.body;
  const productData = Object.assign({}, product);

  const newProduct = new Product(productData);
  
  const sendResponse = (prod) => {

    response.json({
      status: 'success',
      prod
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'product was not saved'
    });
  };

  newProduct.save()
    .then(sendResponse)
    .catch(sendError)

};

module.exports = createProduct;
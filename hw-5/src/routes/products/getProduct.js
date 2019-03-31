const Product = require('../../db/schemas/product');

const getProduct = (request, response) => {
  const id = request.params.id;
  const sendResponse = (product) => {
    response.status(200);
    response.json({
      status: 'success',
      product: product
    });
  };
  const sendError = () => {
    response.status(400);
    response.json({
      status: 'error',
      text: 'there is no such product'
    });
  };

  const findProduct = Product.findById(id);
  
  findProduct
    .then(sendResponse)
    .catch(sendError);
};

module.exports = getProduct;
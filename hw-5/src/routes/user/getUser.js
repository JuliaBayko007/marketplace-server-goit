const User = require('../../db/schemas/user');
const Product = require('../../db/schemas/product');

const findProductById = (products,id) => products.find(item => item == id);
const getUser = (request, response) => {
  const id = request.params.id;
  let favoriteProducts, viewedProducts;
  const createProductIds = (user) => {
    favoriteProducts = user.favoriteProducts;
    viewedProducts = user.viewedProducts;
    return user;
  };
  const sendResponse = (user) => {
    response.status(200);
    response.json({
      status: 'success',
      user: user
    });
  };
  const getProducts = (user) => {
    Product.find()
      .then(products => {
        user.favoriteProducts = products.filter(item => item._id == findProductById(favoriteProducts, item._id));
        user.viewedProducts = products.filter(item => item._id == findProductById(viewedProducts, item._id));
        return user;
      })
      .then(sendResponse)
  };
  const sendError = () => {
    response.status(400);
    response.json({
      status: 'error',
      text: 'there is no such user'
    });
  };

  const findUser = User.findById(id);
  
  findUser
    .then(createProductIds)
    .then(getProducts)
    .catch(sendError);
};

module.exports = getUser;
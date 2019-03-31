const fs = require('fs');
const path = require('path');
const url = require('url');

const getId = url => {
    const lastIndex = url.lastIndexOf('/');
    if (lastIndex !== -1) {
      return url.slice(lastIndex +1);
    }
};
const getProducts = () => {
  const filePath = path.join(__dirname, '../../', 'db', 'all-products.json');
  let products = fs.readFileSync(filePath);
  products = JSON.parse(products);
  return products;
};
const findProduct  = (products, id) => products.find(product => product.id == id);

const getProductById = (request, response) => {
  let finalResult;
  const parsedUrl = url.parse(request.url);
  const id = getId(parsedUrl.path);
  const products = getProducts();
  if(findProduct(products, id) != null)
  {
    finalResult = {
        status: 'success',
        products: findProduct(products, id)
    }
  }
  else
  {
    finalResult = {
        status: 'no products',
        products: []
    }
  }
  response.writeHead(200, {"Content-type": "application/json"});
  response.write(JSON.stringify(finalResult));
  response.end();
};


module.exports = getProductById;
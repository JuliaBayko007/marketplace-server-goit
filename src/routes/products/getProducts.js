const fs = require('fs');
const path = require('path');
const url = require('url');

const getId = url => {
  if(url.lastIndexOf('?') != -1){
    const reg = /\d{8}/g
    if(url.match(reg) == null){
      const regular = /\d{2}\w{2,7}/g
      let result = url.match(regular);
      result = result[0].slice(2);
      return result;
    }else{
      let found = url.match(reg);
      return found;
    }
  }
};
const getProductsFromDb = () => {
  const filePath = path.join(__dirname, '../../', 'db', 'all-products.json');
  let products = fs.readFileSync(filePath);
  products = JSON.parse(products);
  return products;
};
const findProduct  = (products, id) => products.find(product => product.id == id);

const getProducts = (request, response) => {
  let finalResult;
  const parsedUrl = url.parse(request.url);
  const id = getId(parsedUrl.path);
  const products = getProductsFromDb();
  if(Array.isArray(id)){
    const newProducts = id.map(item => findProduct(products, Number.parseInt(item)));
    if(newProducts.length != -1){
      finalResult = {
        status: 'success',
        products: newProducts
      }
    }
  }
  else if(id == undefined)
  {
    finalResult = {
      status: 'success',
      products: products
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


module.exports = getProducts;
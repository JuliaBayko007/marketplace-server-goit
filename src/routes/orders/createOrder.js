const fs = require('fs');
const path = require('path');
const util = require('util');
const Generator = require('id-generator')
const g = new Generator();

const writeFile = util.promisify(fs.writeFile);
const ordersFolder = path.resolve(__dirname, '../../', 'db/users/orders');

const getProductsFromDb = () => {
  const filePath = path.join(__dirname, '../../', 'db', 'all-products.json');
  let products = fs.readFileSync(filePath);
  products = JSON.parse(products);
  return products;
};
const findProduct  = (products, id) => products.find(product => product.id == id);

const saveNewOrder = (fileName, data) => {
  const src = path.resolve(ordersFolder, fileName + '.json');
  const dataStr = JSON.stringify(data);

  return writeFile(src, dataStr);
};
const createFolder = () => {
  if (!fs.existsSync(ordersFolder)){
    fs.mkdirSync(ordersFolder);
  }
}
const createOrder = (request, response) => {
  const order = request.body;
  const orderData = Object.assign({},{ id: g.newId()}, order);

  const productsIds = orderData.products;
  const productsRes = productsIds.map(item => findProduct(getProductsFromDb(), Number.parseInt(item)));

  const resultOrder = Object.assign({}, orderData, { products: productsRes});
  const fileName = resultOrder.id;

  createFolder();

  const sendResponse = () => {
    response.json({
      status: 'success',
      order: resultOrder
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      status: 'failed',
      order: 'null'
    });
  };

  saveNewOrder(fileName, resultOrder)
    .then(sendResponse)
    .catch(sendError);

};

module.exports = createOrder;
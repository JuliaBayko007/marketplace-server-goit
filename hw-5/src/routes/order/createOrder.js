const Order = require('../../db/schemas/order');

const createOrder = (request, response) => {
  const order = request.body;
  const orderData = Object.assign({}, order);

  const newOrder = new Order(orderData);
  const sendResponse = (order) => {

    response.json({
      status: 'success',
      order: order
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'order was not saved'
    });
  };

  newOrder.save()
    .then(sendResponse)
    .catch(sendError)

};

module.exports = createOrder;
const Order = require('../../db/schemas/order');

const getOrder = (request, response) => {
  const id = request.params.id;
  const sendResponse = (order) => {
    response.status(200);
    response.json({
      status: 'success',
      order: order
    });
  };
  const sendError = () => {
    response.status(400);
    response.json({
      status: 'error',
      text: 'there is no such order'
    });
  };

  const findOrder = Order.findById(id);
  
  findOrder
    .then(sendResponse)
    .catch(sendError);
};

module.exports = getOrder;
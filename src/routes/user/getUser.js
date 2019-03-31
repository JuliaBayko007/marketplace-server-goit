const fs = require('fs');
const path = require('path');
const util = require('util');

const usersFolder = path.resolve(__dirname, '../../', 'db/users');

const readFile = util.promisify(fs.readFile);

const getUserFromDb = (id) => {
  const src = path.resolve(usersFolder, id + '.json');
  console.log("1", src);
  return readFile(src , { encoding: 'utf8'})
    .then((user) =>{
      user = JSON.parse(user);
      return user;
      
    })
};
const getUser = (request, response) => {
  const id = request.params.id;

  response.set("Content-Type", "application/json");
  const sendResponse = (res) => {
    response.status(200);
    response.json({
      user: res
    });
  };

  const sendError = () => {
    response.status(500);
    response.json({
        status: 'not found'
    });
  };

  getUserFromDb(id)
    .then((res) => sendResponse(res))
    .catch(sendError);
};

module.exports = getUser;
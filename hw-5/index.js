const startServer = require('./src/server');
const connect = require('./conectDB');
const config = require('./config');
const {port} = config;

startServer(port);
connect();
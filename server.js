const http = require('http');
const url = require('url');
const app=require('./app');
const port = process.env.PORT || 3300;
const server = http.createServer(app);
server.listen(port);


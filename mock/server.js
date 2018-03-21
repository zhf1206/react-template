const mock = require("./mock.js");
const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
server.use(middlewares);

server.get('**', (req, res) => {
  var data = res.data || {};
  var action = req.path;
  action = action.substr(action.lastIndexOf("/")+1);
  data = mock[action];
  console.log(JSON.stringify(data));
  res.json(data);
});

server.post('**', (req, res) => {
  var data = res.data || {};
  var action = req.path;
  action = action.substr(action.lastIndexOf("/")+1);
  data = mock[action];
  console.log(JSON.stringify(data));
  res.json(data);
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  next();
});

server.listen(3001, () => {
  console.log('http://localhost:3001/');
  console.log('JSON Server is running');
});

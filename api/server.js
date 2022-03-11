const express = require('express');
const server = express();

server.use(express.json())

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router')

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter)


server.get('/', (req, res) => {
    res.send(`
      <h1>Hello from server file!</h1>
    `);
  });
module.exports = server;

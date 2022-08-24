/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import { createServer } from 'http';
import { Server } from 'socket.io';

import ExpressServer from './Infrastructures/http/Server';
import container from './Infrastructures/container';
import db from './Infrastructures/database/mongo/db';
import config from './Commons/config';

const { app } = new ExpressServer(container);
const port = config.serverPort;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: ['http://localhost:3000'] },
});

db.on('open', () => {});

io.on('connection', (socket) => {
  socket.on('send-chat', ({ chat, from, to }) => {
    socket.to(to).emit('receive-chat', { chat, from });
  });
  socket.on('join-chat', (myId) => {
    socket.join(myId);
  });
});

httpServer.listen(port);
console.log(`Server running at port ${port}`);

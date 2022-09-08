/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import ExpressServer from './Infrastructures/http/Server';
import container from './Infrastructures/container';
import db from './Infrastructures/database/mongo/db';
import config from './Commons/config';
import chatsSocket from './Interfaces/socket/chats';
import roomSocket from './Interfaces/socket/rooms';
import notifSocket from './Interfaces/socket/notif';

const port = config.serverPort;

const { app } = new ExpressServer(container);
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: config.cors_origin },
});

db.on('open', () => {
  console.log('database connected');
});

io.on('connection', (socket: Socket) => {
  roomSocket(socket);
  chatsSocket(socket, container);
  notifSocket(socket, container);
});

httpServer.listen(port);

console.log(`Server running at port ${port}`);

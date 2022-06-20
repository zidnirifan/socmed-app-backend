/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import Server from './Infrastructures/http/Server';
import container from './Infrastructures/container';
import db from './Infrastructures/database/mongo/db';
import config from './Commons/config';

(async () => {
  const { app } = new Server(container);
  const port = config.serverPort;

  db.on('open', () => {
    app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  });
})();

/* istanbul ignore file */

import mongoose from 'mongoose';
import config from '../../../Commons/config';

let mongoUrl: string;
switch (process.env.NODE_ENV) {
  case 'test':
    mongoUrl = config.mongoUrlTest;
    break;
  case 'dev':
    mongoUrl = config.mongoUrlDev;
    break;
  default:
    mongoUrl = config.mongoUrl;
    break;
}

mongoose.connect(mongoUrl);

const db = mongoose.connection;

export default db;

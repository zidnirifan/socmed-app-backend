/* istanbul ignore file */

import mongoose from 'mongoose';
import config from '../../../Commons/config';

const mongoUrl = `mongodb://${config.mongoHost}:${config.mongoPort}/${
  process.env.NODE_ENV === 'test' ? config.testDB : config.mongoDB
}`;

mongoose.connect(mongoUrl);

const db = mongoose.connection;

export default db;

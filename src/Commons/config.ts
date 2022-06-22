const config = {
  mongoHost: process.env.MONGO_HOST,
  mongoPort: process.env.MONGO_PORT,
  mongoDB: process.env.MONGO_DB,
  testDB: process.env.MONGO_DB_TEST,
  serverPort: process.env.SERVER_PORT,
  accessTokenKey: process.env.ACCESS_TOKEN_KEY,
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
  tokenExpiration: process.env.TOKEN_EXPIRATION,
};

export default config;

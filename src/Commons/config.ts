const config = {
  serverPort: process.env.PORT,
  accessTokenKey: process.env.ACCESS_TOKEN_KEY,
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
  tokenExpiration: parseInt(process.env.TOKEN_EXPIRATION as string, 10),
  mongoUrl: process.env.MONGO_URL as string,
  mongoUrlDev: process.env.MONGO_URL_DEV as string,
  mongoUrlTest: process.env.MONGO_URL_TEST as string,
};

export default config;

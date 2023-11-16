import * as dotenv from 'dotenv';

dotenv.config();

export default () => ({

  databaseMongoDB: {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.PORT,
  },
  fontend: {
    url: process.env.URL_FRONTEND,
  },
});

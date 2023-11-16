import { MongoClient } from 'mongodb';
import config from '../dotenv/config';

const databaseMongoDB = config().databaseMongoDB;

const admin = databaseMongoDB.user;
const passsword = databaseMongoDB.password;
const host = databaseMongoDB.host;

const url = `mongodb+srv://${admin}:${passsword}${host}`;

export async function conection() {
  const client = new MongoClient(url);
  client.connect();
  return client;
}

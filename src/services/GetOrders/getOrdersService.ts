import { conection } from '../../config/db';

async function getOrdersService() {
  try {
    const client = await conection();
    const data = await client
      .db('Home')
      .collection('Status_orders')
      .find({})
      .toArray();
    client.close();
    console.log('Connection closed');
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Puedes lanzar el error o manejarlo según tus necesidades.
  }
}

export { getOrdersService };

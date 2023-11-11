import { conection } from '../../config/db';

async function getOrdersService() {
  try {
    const client = await conection();
    const data = await client
      .db('Home')
      .collection('Status_orders')
      .find({})
      .sort({ _id: 1 }) // Ordena de forma ascendente por el campo _id
      .toArray();
    client.close();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Puedes lanzar el error o manejarlo según tus necesidades.
  }
}

export { getOrdersService };

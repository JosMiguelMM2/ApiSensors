import { conection } from '../../config/db';

async function getOrdersServiceFilterLeds() {
  try {
    const client = await conection();
    const data = await client
      .db('Home')
      .collection('Status_orders')
      .find({
        _id: {
          $gte: 1, // Reemplaza con el valor correspondiente
          $lte: 5, // Reemplaza con el valor correspondiente
        } as any,
      })
      .sort({ _id: 1 }) // Ordena de forma ascendente por el campo _id
      .toArray();
    client.close();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Puedes lanzar el error o manejarlo según tus necesidades.
  }
}

export { getOrdersServiceFilterLeds };

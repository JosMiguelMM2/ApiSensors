import { conection } from '../../config/db';

async function getOrdersServiceEstadisticas(coleccion:string) {
  try {
    const client = await conection();
    const data = await client
      .db('Estadistica')
      .collection(coleccion)
      .find({})
      .sort({ _id: 1 }) // Ordena de forma ascendente por el campo _id
      .toArray();
    //client.close();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Puedes lanzar el error o manejarlo según tus necesidades.
  }
}

export { getOrdersServiceEstadisticas };

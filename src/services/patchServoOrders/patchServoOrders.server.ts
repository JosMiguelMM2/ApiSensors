import { conection } from '../../config/db';

async function patchOrdersDServosService(idNew: Number, degreesNew: Number) {
  try {
    const client = await conection();
    const result = await client
      .db('Home')
      .collection('Status_orders')
      .updateOne({ _id: idNew }, { $set: { degrees: degreesNew } });
    //client.close();
    const resulT= result.acknowledged;
    return resulT;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
export { patchOrdersDServosService };

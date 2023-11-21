import { conection } from '../../config/db';

async function patchOrdersService(idNew: Number, statusLedNew: String, fecha_modificacionNew:String) {
  try {
    const client = await conection();
    const result = await client
      .db('Home')
      .collection('Status_orders')
      .updateOne({ _id: idNew }, { $set: { statusLed: statusLedNew, fecha_modificacion: fecha_modificacionNew, } });
    //client.close();
    const resulT= result.acknowledged;
    return resulT;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export { patchOrdersService };

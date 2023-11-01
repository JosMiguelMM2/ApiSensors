import { conection } from '../../config/db';
import { Sensortemperature } from '../../models/PostSensor/PostSensor.models';

async function postSensorsService(model: Sensortemperature) {
  try {
    const newDocument = {
      name: model.getName(),
      temperature: model.getTemperature(),
      DataTime: model.getDataTime(),
    };
    const client = await conection();

    const result = await client
      .db('Home')
      .collection('sensors_Data')
      .insertOne(newDocument);
    client.close();

    if (result.acknowledged) {
      return 'Inserción exitosa';
    } else {
      return 'Fallo al insertar datos';
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export { postSensorsService };

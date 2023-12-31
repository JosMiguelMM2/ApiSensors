import { Sensortemperature } from '../../models/PostSensor/PostSensor.models';
import { Request, Response } from 'express';
import { postSensorsService } from '../../services/Post.Sensor/postSensortsService';

export default async (req: Request, res: Response) => {
  const { name, temperature, DataTime } = req.body;

  // Validar los datos aquí
  if (!name || !temperature) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  const sensorTemperature = new Sensortemperature(name, temperature, DataTime);
  let fecha = new Date();
  let stringfecha = fecha.toISOString();
  sensorTemperature.setDataTime(stringfecha);
  const resul = await postSensorsService(sensorTemperature);
  console.log(resul);
  res.send(resul);
};

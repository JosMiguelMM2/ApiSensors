import { conection } from '../../config/db';

async function patchHistoryEstadistica(
  idNew: Number,
  tiempo_uso: Number,
  tiempo_apagado: number,
  colecion: string,
  NombreLed: string
) {
  try {
    const client = await conection();
    const result = await client
      .db('Estadistica')
      .collection(colecion)
      .updateOne(
        { _id: idNew },
        {
          $set: {
            nombreLed: NombreLed,
            TiempoUsoHoras: tiempo_uso,
            TiempoApagarHoras: tiempo_apagado,
          },
        }
      );
    //client.close();
    const resulT = result.acknowledged;
    return resulT;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export { patchHistoryEstadistica };

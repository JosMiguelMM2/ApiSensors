import { conection } from '../../config/db';

async function NewPatchHistoryEstadistica(
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
      .insertOne({
        _id: idNew,
        nombreLed: NombreLed,
        TiempoUsoHoras: tiempo_uso,
        TiempoApagarHoras: tiempo_apagado,
      }as any);
    client.close();
    const resulT = result.acknowledged;
    return resulT;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export { NewPatchHistoryEstadistica };

import { getOrdersServiceEstadisticas } from '../../services/GetEstadisticasServices/GetEstadisticas.Services';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const Fecha:string = req.params.fecha;
    const collection= 'Estadistica'+Fecha;
    console.log(collection);
    const data = await getOrdersServiceEstadisticas(collection);
    res.status(200).json({
      status: 'success',
      data: data,
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al procesar la solicitud',
    });
  }
};

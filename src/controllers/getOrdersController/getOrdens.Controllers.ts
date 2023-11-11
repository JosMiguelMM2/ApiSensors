import { getOrdersService } from '../../services/GetOrders/getOrdersService';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    req.body;
    const data = await getOrdersService();
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

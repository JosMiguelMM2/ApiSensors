import { Request, Response } from 'express';
import { patchOrdersService}  from '../../services/patchOrders/patchOrdersService';

export default async (req: Request, res: Response) => {
  const OrderID = req.params.id;
  const OrderIDInt: Number = parseInt(OrderID);
  const statusLed = req.body.statusLed;
  if (!statusLed) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  console.log(OrderIDInt);
  console.log(statusLed);
  const ejecution=await patchOrdersService(OrderIDInt, statusLed);
  res.send('Orden actualizada' + ejecution);
};

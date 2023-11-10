import { Request, Response } from 'express';
import { patchOrdersService } from '../../services/patchOrders/patchOrdersService';
import { patchOrdersDServosService } from '../../services/patchServoOrders/patchServoOrders.server';

export default async (req: Request, res: Response) => {
  const OrderID = req.params.id;
  const OrderIDInt: number = parseInt(OrderID);
  if (OrderIDInt > 5 && OrderIDInt <= 7) {
    const degreesD = req.body.degrees;
    const degreesID = parseInt(degreesD);
    console.log('Nu ' + degreesID);
    const envio = await patchOrdersDServosService(OrderIDInt, degreesID);
    res.send(envio);
  } else if (OrderIDInt <= 5 && OrderIDInt > 0) {
    const statusLed = req.body.statusLed;
    if (!statusLed) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    console.log(OrderIDInt);
    console.log(statusLed);
    const ejecution = await patchOrdersService(OrderIDInt, statusLed);
    res.send('Orden actualizada ' + ejecution);
  } else {
    res.status(404).json({ error: 'Orden no encontrada' });
  }
};

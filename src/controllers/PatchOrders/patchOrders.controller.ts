import { Request, Response } from 'express';
import { patchOrdersService } from '../../services/patchOrders/patchOrdersService';
import { patchOrdersDServosService } from '../../services/patchServoOrders/patchServoOrders.server';

function Mensaje(result: boolean, res: Response) {
  if (result) {
    res.status(200).json({
      status: 'success',
      message: 'Operación completada correctamente',
      data: result, // Puedes incluir información adicional si es necesario
    });
  }
}

export default async (req: Request, res: Response) => {
  const OrderID = req.params.id;
  const OrderIDInt: number = parseInt(OrderID);
  try {
    if (OrderIDInt > 5 && OrderIDInt <= 7) {
      const degreesD = req.body.degrees;
      const degreesID = parseInt(degreesD);
      const envio = await patchOrdersDServosService(OrderIDInt, degreesID);

      Mensaje(envio, res);
    } else if (OrderIDInt <= 5 && OrderIDInt > 0) {
      const statusLed = req.body.statusLed;
      console.log('hola');
      if (!statusLed) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
      }

      const ejecution = await patchOrdersService(OrderIDInt, statusLed);

      Mensaje(ejecution, res);
    } else {
      res.status(404).json({ error: 'Orden no encontrada' });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al procesar la solicitud',
    });

  }
};

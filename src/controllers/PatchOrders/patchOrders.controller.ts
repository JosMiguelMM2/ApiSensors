import { Request, Response } from 'express';
import { patchOrdersService } from '../../services/patchOrders/patchOrdersService';
import { patchOrdersDServosService } from '../../services/patchServoOrders/patchServoOrders.server';
import {SendSuccessResponse} from '../../utils/controllers/patchOrdersFunction/responseUtils';

async function DoorOrder(
  req: Request,
  res: Response,
  OrderIDInt: number,
  Opendegrees: number,
  Closedegrees: number
) {
  const puerta: String = req.body.StadoPuerta;
  if (puerta == 'OPEN') {
    const envio = await patchOrdersDServosService(OrderIDInt, Opendegrees);
    SendSuccessResponse(envio, res);
  } else if (puerta == 'CLOSE') {
    const envio = await patchOrdersDServosService(OrderIDInt, Closedegrees);
    SendSuccessResponse(envio, res);
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Datos incorrectos',
    });
  }
}

export default async (req: Request, res: Response) => {
  const OrderID = req.params.id;
  const OrderIDInt: number = parseInt(OrderID);
  try {
    if (OrderIDInt > 5 && OrderIDInt <= 7) {
      switch (OrderIDInt) {
        case 6:
          DoorOrder(req, res, OrderIDInt, 90, 0);
          break;
        case 7:
          DoorOrder(req, res, OrderIDInt, 90, 0);
          break;
        default:
          break;
      }
    } else if (OrderIDInt <= 5 && OrderIDInt > 0) {
      const statusLed = req.body.statusLed;
      if (!statusLed) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
      }

      if (statusLed != 'LOW' && statusLed != 'HIGH') {
        res.status(400).json({
          status: 'error',
          message: 'Datos incorrectos',
        });
      } else {
        const ejecution = await patchOrdersService(OrderIDInt, statusLed);

        SendSuccessResponse(ejecution, res);
      }
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

import { Request, Response } from 'express';
import { patchOrdersService } from '../../services/patchOrders/patchOrdersService';
import { patchOrdersDServosService } from '../../services/patchServoOrders/patchServoOrders.server';
import { SendSuccessResponse } from '../../utils/controllers/patchOrdersFunction/responseUtils';
import { getOrdersServiceFilterLeds } from '../../services/GetOrders/GetOrderServiceFilter';
import {
  fechaAString,
  fechaStringString,
} from '../../utils/controllers/patchOrdersFunction/fechaString';
import { getOrdersServiceEstadisticas } from '../../services/GetEstadisticasServices/GetEstadisticas.Services';

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
        const dataOrders = await getOrdersServiceFilterLeds();

        // Formatear la fecha como una cadena
        let formattedDate: string = fechaAString();

        for (let i = 0; i < dataOrders.length; i++) {
          const RegistroID: number = parseInt(dataOrders[i]._id.toString(), 16);
          if (RegistroID == OrderIDInt) {
            const RegistroLed: string = dataOrders[i].statusLed;

            if (RegistroLed == 'LOW' && statusLed == 'HIGH') {
              const coleccion: string =
                'Estadistica' + fechaStringString(formattedDate);
              const datos = await getOrdersServiceEstadisticas(coleccion);
              console.log(datos);
              if (datos.length > 0) {
                for (let j = 0; j < datos.length; j++) {
                  const RegistroID: Number = parseInt(
                    datos[j]._id.toString(),
                    16
                  );
                  if (OrderIDInt == RegistroID) {
                    const nombreLed: string = datos[j].nombreLed;
                    const TiempoUsoHoras: number = datos[j].TiempoUsoHoras;
                    const TiempoApagarHoras: number =datos[j].TiempoApagarHoras;
                    console.log('Se traen de estadisticas ' + RegistroID);
                    console.log('Se traen de estadisticas ' + nombreLed);
                    console.log('Se traen de estadisticas ' + TiempoUsoHoras);
                    console.log('Se traen de estadisticas ' + TiempoApagarHoras);
                  }
                }
              }
            } else if (RegistroLed == 'HIGH' && statusLed == 'LOW') {
              const coleccion: string =
                'Estadistica' + fechaStringString(formattedDate);
              const datos = await getOrdersServiceEstadisticas(coleccion);
              if (datos.length > 0) {
                for (let i = 0; i < datos.length; i++) {
                  const RegistroID: number = parseInt(
                    dataOrders[i]._id.toString(),
                    16
                  );
                  console.log('Se traen de estadisticas ' + RegistroID);
                }
              }
              console.log(datos);
              console.log('Apagando Led');
            } else {
              formattedDate = dataOrders[i].fecha_modificacion;
            }
          }
        }
        const ejecution = await patchOrdersService(
          OrderIDInt,
          statusLed,
          formattedDate
        );
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

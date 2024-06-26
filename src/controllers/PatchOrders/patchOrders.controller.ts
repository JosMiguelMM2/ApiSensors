import { Request, Response } from 'express';
import { patchOrdersService } from '../../services/patchOrders/patchOrdersService';
import { patchOrdersDServosService } from '../../services/patchServoOrders/patchServoOrders.server';
import { SendSuccessResponse } from '../../utils/controllers/patchOrdersFunction/responseUtils';
import { getOrdersServiceFilterLeds } from '../../services/GetOrders/GetOrderServiceFilter';
import {
  fechaAString,
  fechaStringString,
} from '../../utils/controllers/patchOrdersFunction/fechaString';
import { patchHistoryEstadistica } from '../../services/Insertestadiscas/InsertEstadisticas.Services';
import { NewPatchHistoryEstadistica } from '../../services/Insertestadiscas/InsertNewEstadisticas.Services';
import { getOrdersServiceEstadisticasOne } from '../../services/GetEstadisticasServices/GetEstadisticasOne.Services';

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
        const coleccion: string =
          'Estadistica' + fechaStringString(formattedDate);
        const datos = await getOrdersServiceEstadisticasOne(coleccion,OrderIDInt);

        for (let i = 0; i < dataOrders.length; i++) {
          const RegistroID: number = parseInt(dataOrders[i]._id.toString(), 16);
          const nombre: string = dataOrders[i].nombre;
          if (RegistroID == OrderIDInt) {
            const RegistroLed: string = dataOrders[i].statusLed;
            const Fecha: string = dataOrders[i].fecha_modificacion;

            if (RegistroLed == 'LOW' && statusLed == 'HIGH') {
              if (datos.length > 0) {
                const RegistroID: Number = parseInt(
                  dataOrders[i]._id.toString(),
                  16
                );
                if (OrderIDInt == RegistroID) {
                  const nombreLed: string = datos[0].nombreLed;
                  const TiempoUsoHoras: number = datos[0].TiempoUsoHoras;
                  let TiempoApagarHoras: number = datos[0].TiempoApagarHoras;

                  const fechaOriginal = new Date(Fecha);
                  const fechaActual = new Date();

                  // Calcular la diferencia en milisegundos
                  const diferenciaEnMilisegundos =
                    fechaActual.getTime() - fechaOriginal.getTime();

                  // Calcular la diferencia en horas
                  const horasDiferencia =
                    diferenciaEnMilisegundos / (1000 * 60 * 60);

                  TiempoApagarHoras = TiempoApagarHoras + horasDiferencia;
                  patchHistoryEstadistica(
                    RegistroID,
                    TiempoUsoHoras,
                    TiempoApagarHoras,
                    coleccion,
                    nombreLed
                  );
                }
              } else {
                await NewPatchHistoryEstadistica(
                  RegistroID,
                  0,
                  0,
                  coleccion,
                  nombre
                );
              }
            } else if (RegistroLed == 'HIGH' && statusLed == 'LOW') {
              if (datos.length > 0) {
                const RegistroID: number = parseInt(
                  dataOrders[i]._id.toString(),
                  16
                );

                if (OrderIDInt == RegistroID) {
                  const nombreLed: string = datos[0].nombreLed;
                  let TiempoUsoHoras: number = datos[0].TiempoUsoHoras;
                  const TiempoApagarHoras: number = datos[0].TiempoApagarHoras;

                  const fechaOriginal = new Date(Fecha);
                  const fechaActual = new Date();

                  // Calcular la diferencia en milisegundos
                  const diferenciaEnMilisegundos =
                    fechaActual.getTime() - fechaOriginal.getTime();

                  // Calcular la diferencia en horas
                  const horasDiferencia =
                    diferenciaEnMilisegundos / (1000 * 60 * 60);

                  TiempoUsoHoras = TiempoUsoHoras + horasDiferencia;
                  patchHistoryEstadistica(
                    RegistroID,
                    TiempoUsoHoras,
                    TiempoApagarHoras,
                    coleccion,
                    nombreLed
                  );
                }
              } else {
                await NewPatchHistoryEstadistica(
                  RegistroID,
                  0,
                  0,
                  coleccion,
                  nombre
                );
              }
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
      error: error,
    });
  }
};

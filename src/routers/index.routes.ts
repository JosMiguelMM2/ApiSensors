import { Router} from 'express';
import led from '../controllers/getOrdersController/getOrdens.Controllers';
import Sensor from '../controllers/PostData/PostData.controller'
import orders from '../controllers/PatchOrders/patchOrders.controller'
import verEstadisticas from '../controllers/GetEstadisticasLeds/getEstadisticas.Controllers'
const router = Router();
router.get('/Stado', led);
router.post('/Newta', Sensor);
router.patch('/Orden/:id', orders);
router.get('/Estadisticas/:fecha', verEstadisticas);

export default router;

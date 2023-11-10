import { Router} from 'express';
import led from '../controllers/Leds/leds.controller';
import Sensor from '../controllers/PostSensor/postSensor.controller'
import orders from '../controllers/PatchOrders/patchOrders.controller'
const router = Router();
router.get('/Stado', led);
router.post('/Newta', Sensor);
router.patch('/Orden/:id', orders);
export default router;

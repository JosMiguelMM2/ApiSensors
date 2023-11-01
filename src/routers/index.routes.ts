import { Router} from 'express';
import led from '../controllers/Leds/leds.controller';
import Sensor from '../controllers/PostSensor/postSensor.controller'
const router = Router();
router.get('/Stado', led);
router.post('/Newta', Sensor);
export default router;

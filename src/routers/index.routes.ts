import { Router} from 'express';
import led from '../controllers/Leds/leds.controller';
const router = Router();
router.get('/Stado', led);

export default router;

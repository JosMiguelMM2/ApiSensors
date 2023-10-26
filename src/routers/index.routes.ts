import { Router } from 'express';
import { conection } from '../config/db';

const router = Router();
//ESTO ES UNA PRUEBA, NO ES NECESARIO
router.get('/ping', (req, res) => {
  req.body;
  console.log('someone pinged her');
  const client = conection();
  client.then((client) => {
    client
      .db('platzi_store')
      .collection('products')
      .find({})
      .toArray()
      .then((data) => {
        res.json(data);
        client.close();
      });
  });
});

export default router;

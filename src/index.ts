import express from 'express';
import cors from 'cors';
import indexroutes from './routers/index.routes';
import config  from './dotenv/config';
const app = express();
const PORT = config().databaseMongoDB.port || 3000;

//const url = config().fontend.url;
/*.use(
  cors({
    origin: `${url}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  })
);*/

//ggt
app.use(cors());
app.use(express.json());
app.use(indexroutes);



app.listen(PORT, () => {
  console.log(`Server  running on port ${PORT}`);
});

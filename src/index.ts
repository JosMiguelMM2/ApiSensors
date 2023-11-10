import express from 'express';
import cors from 'cors';
import indexroutes from './routers/index.routes';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(indexroutes);

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
}));

app.listen(PORT, () => {
  console.log(`Server  running on port ${PORT}`);
});

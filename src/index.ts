import express from 'express';
import cors from 'cors';
import indexroutes from './routers/index.routes';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(indexroutes);

app.use(cors({
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
}));

app.listen(PORT, () => {
  console.log(`Server  running on port ${PORT}`);
});

import express from 'express';
import indexroutes from './routers/index.routes'
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(indexroutes);


app.listen(PORT, () => {
  console.log(`Server  running on port ${PORT}`);
});

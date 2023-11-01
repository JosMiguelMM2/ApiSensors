import { getOrdersService } from '../../services/GetOrders/getOrdersService';
import { Request, Response } from 'express';


export default async (req:Request, res:Response) => {
  req.body;
  const data = await getOrdersService();
  res.send(data);
}

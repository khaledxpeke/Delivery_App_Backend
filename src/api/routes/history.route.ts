import { Router, Request, Response } from 'express';
import HistoryController from '../controllers/history.controller';

const route: Router = Router();

route.post('/', async (req: Request, res: Response) => {
  const controller = new HistoryController();

  const result = await controller.addHistory(req.body);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});

route.get('/', async (_req: Request, res: Response) => {
  const controller = new HistoryController();
  const result = await controller.getOrdersHistory();
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});


route.get('/:id', async (req: Request, res: Response) => {
  const controller = new HistoryController();
  const result = await controller.getOrderById(req.params.id);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(result);
});

export default route;
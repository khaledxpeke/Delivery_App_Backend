import { Router, Request, Response } from 'express';
import DepotController from '../controllers/depot.controller';
import { verifyToken } from '../helpers/auth';

const route: Router = Router();

route.post('/', async (req: Request, res: Response) => {
  const controller = new DepotController();
  const result = await controller.addDepot(req.body);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
route.get('/', async (req: Request, res: Response) => {
  const controller = new DepotController();
  const result = await controller.getAllDepots();
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
route.get('/calendar/:userId', async (req: Request, res: Response) => {
  const controller = new DepotController();
  const result = await controller.calendar(req.params.userId);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
route.get('/:id', async (req: Request, res: Response) => {
  const controller = new DepotController();
  const result = await controller.getDepotById(req.params.id);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});

route.delete('/:id', async (req: Request, res: Response) => {
  const controller = new DepotController();
  const result = await controller.deleteDepot(req.params.id);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});

route.post('/status/:depotID', async (req: any, res: Response) => {
  const controller = new DepotController();
  const result = await controller.setDepotStatus(req.params.depotID, req.body.status);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
route.get('/delivery/:userId', async (req: Request, res: Response) => {
  const controller = new DepotController();
  const result = await controller.getAllDepotsByDeliveryMan(req.params.userId);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
export default route;
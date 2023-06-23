import { Router, Request, Response } from 'express';
import { LivraisonController } from '../controllers/livraison.controller';
import OrderController from '../controllers/order.controller';

const route: Router = Router();

route.post('/', async (req: Request, res: Response) => {
  const controller = new LivraisonController();

  const result = await controller.addLivraison(req.body);
  const controller1 = new OrderController();

  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
  const result1 = await controller1.addLivraisonId(req.body.order, data._id);
  const { error1, data1 } = result1;
  if (error1) {
    res.status(400).json(error1);
    return;
  }
  res.status(200).send(data1);
});
route.get('/', async (req: Request, res: Response) => {
  const controller = new LivraisonController();
  const result = await controller.getAllLivraison();
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
route.get('/:id', async (req: Request, res: Response) => {
  try {
    const controller = new LivraisonController();
    const result = await controller.getLivraisonById(req.params.id);
    const { error, data } = result;
    res.sendStatus(result);
  } catch (e) {
    console.log(e)
  }

});
route.delete('/:id', async (req: Request, res: Response) => {
  const controller = new LivraisonController();
  const result = await controller.deleteLivraison(req.params.id);
  res.sendStatus(200);
});
export default route;
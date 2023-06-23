import { Router, Request, Response } from 'express';
import { VehiculeController } from '../controllers/vehicule.controller';

const route: Router = Router();

route.post('/', async (req: Request, res: Response) => {
  const controller = new VehiculeController();
  const result = await controller.addVehicule(req.body);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
route.get('/', async (req: Request, res: Response) => {
  const controller = new VehiculeController();
  const result = await controller.getAllVehicules();
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
route.delete('/:id', async (req: Request, res: Response) => {
  const controller = new VehiculeController();
  const result = await controller.deleteVehicule(req.params.id);
  res.sendStatus(200);
});
route.get('/:id', async (req: Request, res: Response) => {
  const controller = new VehiculeController();
  const result = await controller.getVehiculeById(req.params.id);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});

route.post('/update/:id', async (req, res) => {

  const controller = new VehiculeController();
  const result = await controller.updateVehicule(req.params.id, req.body.name, req.body.model, req.body.registrationNumber, req.body.image, req.body.color);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
},
);
export default route;
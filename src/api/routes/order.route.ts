import { Router, Request, Response } from 'express';
import OrderController from '../controllers/order.controller';
import { verifyToken } from '../helpers/auth';
import multer from 'multer';
import * as fs from "fs";
import path from 'path';


////////////////////// FILE UPLOAD //////////////////////////////////////

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(__dirname + '/uploads'))
  },

  filename: function (_req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix)

  }
});
const fileFilter = (_req: any, _file: any, cb: any) => {
  cb(null, true)
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

////////////////////// FILE UPLOAD //////////////////////////////////////
const route: Router = Router();

route.post('/', async (req: Request, res: Response) => {
  const controller = new OrderController();
  const result = await controller.addOrder(req.params.id);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});

route.post('/claim/:orderID', async (req: any, res: Response) => {
  let base64String = req.body.image;
  let base64Image = base64String.split(';base64,').pop();
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  fs.writeFile(`image${uniqueSuffix}.png`, base64Image, { encoding: 'base64' }, async (err) => {
    console.log('File created');
    const controller = new OrderController();
    const result = await controller.claimOrder(req.params.orderID, req.body.image);
    const { error, data } = result;
    if (error) {
      res.status(400).json(error);
      return;
    }
    res.status(200).send(data);
  });
});

route.post('/verificationId/:orderID', async (req: any, res: Response) => {
  const controller = new OrderController();
  const result = await controller.addVerificationId(req.params.orderID, req.body.verificationId);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});

route.post('/LivraisonId/:orderID', async (req: any, res: Response) => {
  const controller = new OrderController();
  const result = await controller.addLivraisonId(req.params.orderID, req.body.livraison);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});

route.get('/', async (_req: Request, res: Response) => {
  const controller = new OrderController();
  const result = await controller.getAllOrders();
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
route.post('/scan/:orderID', async (req: any, res: Response) => {
  const controller = new OrderController();
  const result = await controller.scanOrder(req.params.orderID, req.body.qrCode);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});

route.post('/status/:orderID', async (req: any, res: Response) => {
  const controller = new OrderController();
  const result = await controller.setOrder(req.params.orderID, req.body.status);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
route.get('/depot/:depotID', async (req: any, res: Response) => {
  const controller = new OrderController();
  const result = await controller.getOrdersByDepot(req.params.depotID);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
route.get('/order/:userId', async (req: any, res: Response) => {
  const controller = new OrderController();
  const result = await controller.getOrderByDeliveryMan(req.params.userId);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
route.post('/accept/:orderID', async (req: any, res: Response) => {
  const controller = new OrderController();
  const result = await controller.acceptOrder(req.params.orderID);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
route.post('/refuse/:orderID', async (req: any, res: Response) => {
  const controller = new OrderController();
  const result = await controller.refuseOrder(req.params.orderID);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});

route.get('/close/:orderID', async (req: any, res: Response) => {
  const controller = new OrderController();
  const result = await controller.closeOrder(req.params.orderID);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});

route.get('/:id', async (req: Request, res: Response) => {
  const controller = new OrderController();
  const result = await controller.getOrderById(req.params.id);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(result);
});

route.put('/:id', (_req: Request, res: Response) => {
  res.sendStatus(200);
});
route.delete('/:id', async (req: Request, res: Response) => {
  const controller = new OrderController();
  const result = await controller.deleteOrder(req.params.id);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
export default route;

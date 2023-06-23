import _ from 'lodash';

import UserController from '../controllers/user.controller';
import { verifyToken } from '../helpers/auth';
import { Router } from 'express';


const route: Router = Router();


route.post('/login', async (req, res) => {
  const controller = new UserController();

  const args = _.get(req, 'body');
  const { email, code } = args;
  if (!email && !code || !code && (!email)) {
    res.status(400).json('Missing params');
    return;
  }

  const result = await controller.loginUser({
    email,

    code
  });

  const { error, data } = result;

  if (error) {
    res.status(400).json(error);
    return;
  }

  res.status(200).send(data);
});


route.post('/forget', async (req, res) => {
  const controller = new UserController();

  const args = _.get(req, 'body');
  const { email } = args;
  if (!email) {
    res.status(400).json('Missing params');
    return;
  }

  const result = await controller.forgetPassword({
    email
  });

  const { error, data } = result


  if (error) {
    res.status(400).json(error);
    return;
  }

  res.status(200).send(data);
});

route.post('/confirm/:userID', async (req, res) => {
  const controller = new UserController();
  const code = req.body.code
  const result = await controller.ConfirmCode(req.params.userID, req.body.code);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});

route.post('/signup', async (req, res) => {
  const controller = new UserController();
  const args = _.get(req, 'body');
  const { email, lastname, name, code, role } = args;
  if (!email) {
    res.status(400).json('Missing params');
    return;
  }

  const result = await controller.signupUser({
    email,
    lastname, name, code, role
  });

  const { error } = result;

  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(result);
});

route.post('/', async (req, res) => {
  const controller = new UserController();

  const result = await controller.user({
    userId: _.get(req, 'userId'),
  });
  const { error, data } = result;

  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});

route.post('/update/:userId', async (req, res) => {

  const controller = new UserController();
  const result = await controller.updateProfile(req.params.userId, req.body.name, req.body.email, req.body.address, req.body.phone, req.body.image);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
},
);

route.post('/updateCode/:userId', async (req, res) => {

  const controller = new UserController();
  const result = await controller.updateCode(req.params.userId, req.body.code);
  const { error, data } = result; 
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
}
);


route.get('/profile/:userId', async (req, res) => {
  const controller = new UserController();
  const result = await controller.getUserProfile(req.params.userId);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});

route.get('/', async (req, res) => {
  const controller = new UserController();
  const result = await controller.getAllUsers();
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
export default route;






















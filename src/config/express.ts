import * as express from 'express';
import routes from '../api/routes';
import { Application } from 'express';
import swaggerUi from "swagger-ui-express";
import bodyParser from 'body-parser';
export default function expressConfig(app: Application): Application {
  const corsOption = {
    origin: '*',
    credentials: true
  };

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded( {limit: '50mb', extended: true}));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/', routes);
  const swaggerDocument = require('../../public/swagger.json');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return app;
}
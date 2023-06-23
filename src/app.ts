import Logger from './api/lib/logger';
import { Server } from 'net';
import { Application } from 'express';
import config  from "./config/config";

import { createServer } from './server';
import Connect from "./config/connect";

export function startServer(): Server {

  const app: Application = createServer();
  Connect({ db : config.MONGO_URI })
  return app.listen(config.PORT, async () => {
    Logger.debug(`Server is listening on port  ${config.PORT}`);
  });
}


startServer();
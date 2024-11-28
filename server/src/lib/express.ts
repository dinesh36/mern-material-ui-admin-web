import express from 'express';
import cors from 'cors';

import loginRoutes from '../modules/auth/auth.routes';
import { HttpException } from './HttpException';
import { validator } from './validator';
import { passportAuth } from '../lib/passport';

const app = express();

class ExpressServer {
  reqWrapper(method: any) {
    return async (req: any, res: any) => {
      const { body, params, query, user, file } = req;
      const userId = user?._id;
      try {
        const response = await method({
          body,
          params,
          query,
          userId,
          HttpException,
          validator,
          file,
        });
        res.send({
          status: 'success',
          data: response,
        });
      } catch (e: any) {
        const message = e.message || 'Internal Server Error';
        const statusCode = e.statusCode || 500;
        res.status(statusCode).json({
          status: 'error',
          error: {
            message: message,
          },
        });
      }
    };
  }

  initModuleRoutes() {
    loginRoutes.init(app, this.reqWrapper);
  }

  initAppPlugins() {
    app.use(cors());
    app.use(express.json());
    passportAuth.init(app);
  }

  initServer() {
    this.initAppPlugins();
    this.initModuleRoutes();
    return app;
  }
}
const expressServer = new ExpressServer();
export default expressServer;

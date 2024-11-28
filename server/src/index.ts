import serverlessExpress from '@codegenie/serverless-express';
import expressServer from './lib/express';
import initDb from './utils/init-db';

const app = expressServer.initServer();

initDb();
exports.handler = serverlessExpress({ app });

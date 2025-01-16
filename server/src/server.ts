import expressServer from './lib/express';
import initDb from './utils/init-db';
import express from "express";
import path from "path";

const PORT = 5001;

class Server {
  async initServer() {
    await initDb();
    const app = expressServer.initServer();
    app.use('/mern-material-ui-admin-web/uploads', express.static(path.join(__dirname, '../../uploads')));
    app.listen(PORT, () => {
      // eslint-disable-next-line
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
}

const serverInstance = new Server();
serverInstance.initServer();

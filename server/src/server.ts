import expressServer from './lib/express';
import initDb from './utils/init-db';

const PORT = 5001;

class Server {
  async initServer() {
    await initDb();
    const app = expressServer.initServer();
    app.listen(PORT, () => {
      // eslint-disable-next-line
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
}

const serverInstance = new Server();
serverInstance.initServer();

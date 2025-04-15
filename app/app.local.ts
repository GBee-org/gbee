import { ServerConfig } from "./src/config";
import Server from "./src/app";

(async () => {
  const app = await Server();

  logging.info('-----------------------------------------');
  logging.info('Start Server');
  logging.info('-----------------------------------------');
  app.listen(ServerConfig.PORT, () => {
    logging.info('-----------------------------------------');
    logging.info('Server started: ' + ServerConfig.HOSTNAME + ':' + ServerConfig.PORT);
    logging.info('-----------------------------------------');
  });
})();

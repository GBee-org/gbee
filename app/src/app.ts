import http from 'http';
import express from 'express';
import './config';
import 'reflect-metadata';

import { corsHandler, declareHandler, loggingHandler, routeNotFound } from './middleware';
import { defineRoutes } from './modules/route';
import { AppDataSource, ServerConfig } from './config';
import { AuthController, UsersController } from './controllers';
import { userService } from './services';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

const Server = async () => {
  logging.info('-----------------------------------------');
  logging.info('Initializing API');
  logging.info('-----------------------------------------');
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());

  logging.info('-----------------------------------------');
  logging.info('Connect to PostgreSQL Database');
  logging.info('-----------------------------------------');
  try {
    await AppDataSource.initialize();
    await userService.initializeDefaultUser();
    logging.info('-----------------------------------------');
    logging.info('Connected to PostgreSQL Database');
    logging.info('-----------------------------------------');
  } catch (error) {
    logging.info('-----------------------------------------');
    logging.error('Unable to Connect to PostgreSQL Database');
    logging.error(error);
    logging.info('-----------------------------------------');
    process.exit(1);
  }

  logging.info('-----------------------------------------');
  logging.info('Logging & Configuration');
  logging.info('-----------------------------------------');
  application.use(declareHandler);
  application.use(loggingHandler);
  application.use(corsHandler);

  logging.info('-----------------------------------------');
  logging.info('Define Controller Routing');
  logging.info('-----------------------------------------');
  defineRoutes([AuthController, UsersController], application);

  logging.info('-----------------------------------------');
  logging.info('Define Controller Routing');
  logging.info('-----------------------------------------');
  application.use(routeNotFound);

  return application;
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

export default Server;

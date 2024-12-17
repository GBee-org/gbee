import { Handler } from 'express';
import serverlessExpress from '@codegenie/serverless-express';
import app from './app.js';

export const handler: Handler = serverlessExpress({ app });
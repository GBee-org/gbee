import { Handler } from 'express';
import serverlessExpress from '@vendia/serverless-express';
import app from './app.js';

const handler: Handler = serverlessExpress({ app });

export default handler;
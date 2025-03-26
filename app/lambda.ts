import Server from './src/app';
import { Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

let server: Handler;

const setupServer = async (): Promise<Handler> => {
  const app = await Server();
  return serverlessExpress({ app });
};

setupServer();

export const handler: Handler = async (event: any, context: any, callback: any) => {
  if (!server) {
    server = await setupServer();
  }
  return server(event, context, callback);
};

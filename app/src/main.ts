import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as awsServerlessExpress from 'aws-serverless-express';
import { Context, Handler } from 'aws-lambda';

let cachedServer: Handler;

const bootstrapServer = async () => {
  const app = await NestFactory.create(AppModule);
  await app.init();
  return awsServerlessExpress.createServer(app.getHttpAdapter().getInstance());
};

export const handler: Handler = async (event: any, context: Context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE')
    .promise;
};

// async function launchLocal() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }

// launchLocal();

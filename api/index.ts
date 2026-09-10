import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { AppModule } from '../apps/api/src/app.module';

let handler: ((request: Request, response: Response) => void) | undefined;
let initialization: Promise<(request: Request, response: Response) => void> | undefined;

async function createHandler() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: configService.get('FRONTEND_URL') || true,
    credentials: true,
  });

  await app.init();
  return app.getHttpAdapter().getInstance() as (request: Request, response: Response) => void;
}

export default async function vercelHandler(request: Request, response: Response) {
  try {
    if (request.url?.startsWith('/api')) {
      request.url = request.url.replace(/^\/api(?=\/|$)/, '') || '/';
    }

    if (!handler) {
      initialization ??= createHandler();
      handler = await initialization;
    }
    return handler(request, response);
  } catch (error) {
    console.error('API function initialization failed', error);
    return response.status(500).json({
      statusCode: 500,
      message: 'API initialization failed',
      ...(process.env.NODE_ENV !== 'production' && {
        detail: error instanceof Error ? error.message : String(error),
      }),
    });
  }
}

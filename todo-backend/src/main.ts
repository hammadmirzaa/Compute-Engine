import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import next from 'next';
import { Request, Response } from 'express';

async function bootstrap() {
  const dev = process.env.NODE_ENV !== 'production';
  const appNext = next({ dev });
  const handle = appNext.getRequestHandler();

  await appNext.prepare();

  const app = await NestFactory.create(AppModule);

  // Serve Next.js pages through Nest
  app.use((req: Request, res: Response, next) => {
    if (req.url.startsWith('/api')) return next();
    return handle(req, res);
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();

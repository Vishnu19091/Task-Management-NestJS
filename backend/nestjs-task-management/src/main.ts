import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.intercept';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // allowed ORIGINS:
    origin: [
      'http://localhost:3000',
      'https://task-management-nest-js.vercel.app',
    ],
    // Allowed Methods
    methods: 'GET, PATCH, POST, DELETE, HEAD, PUT',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

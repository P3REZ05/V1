import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log('conexion con la base de datos')
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

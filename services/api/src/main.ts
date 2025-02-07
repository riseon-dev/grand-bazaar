import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get<ConfigService>(ConfigService);

  app.enableShutdownHooks();
  await app.register(fastifyCookie);
  app.enableCors();
  await app.listen(
    configService.getOrThrow<string>('SERVICE_API_PORT'),
    '0.0.0.0',
  );
}

bootstrap().then(() => {});

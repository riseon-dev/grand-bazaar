import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Runner } from './runner';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const runner = app.get(Runner);
  runner.run();
  await app.close();
}

bootstrap().then(() => {});

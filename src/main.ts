import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import { EnvConfigService } from './env-config/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const apiEnvConfigService = app.get(EnvConfigService);

  const port = apiEnvConfigService.getEnvVariable('PORT');

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
  logger.log(`Application is running on: ${port}`);
}

void bootstrap();

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

import { EnvConfigService } from './env-config/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const apiEnvConfigService = app.get(EnvConfigService);

  const port = apiEnvConfigService.getEnvVariable('PORT');

  await app.listen(port);
  logger.log(`Application is running on: ${port}`);
}
void bootstrap();

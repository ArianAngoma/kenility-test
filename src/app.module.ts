import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvConfigModule } from './env-config/env-config.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { envSchema } from './env-config/env-config.schema';

@Module({
  imports: [
    EnvConfigModule,
    ConfigModule.forRoot({
      validate: (config) => envSchema.parse(config),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

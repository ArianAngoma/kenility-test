import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvConfigService } from './env-config.service';

@Global()
@Module({
  providers: [EnvConfigService],
  exports: [EnvConfigService],
  imports: [ConfigModule],
})
export class EnvConfigModule {}

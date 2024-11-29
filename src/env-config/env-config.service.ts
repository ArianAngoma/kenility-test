import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from './env-config.schema';

@Injectable()
export class EnvConfigService {
  constructor(private readonly configService: ConfigService<Env, true>) {}

  getEnvVariable<K extends keyof Env>(key: K): Env[K] {
    return this.configService.get<Env[K]>(key);
  }
}

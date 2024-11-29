import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvConfigModule } from './env-config/env-config.module';

import { envSchema } from './env-config/env-config.schema';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigService } from './env-config/env-config.service';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    EnvConfigModule,
    ConfigModule.forRoot({
      validate: (config) => envSchema.parse(config),
    }),
    MongooseModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: async (envConfigService: EnvConfigService) => {
        const username = envConfigService.getEnvVariable('MONGO_DB_USERNAME');
        const password = envConfigService.getEnvVariable('MONGO_DB_PASSWORD');
        const dbName = envConfigService.getEnvVariable('MONGO_DB_NAME');

        return {
          uri: `mongodb://${username}:${password}@localhost:27017`,
          dbName,
        };
      },
    }),
    ProductsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

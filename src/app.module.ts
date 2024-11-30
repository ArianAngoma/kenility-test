import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvConfigModule } from './env-config/env-config.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

import { EnvConfigService } from './env-config/env-config.service';

import { envSchema } from './env-config/env-config.schema';

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
          uri: `mongodb://${username}:${password}@kenility-db`,
          dbName,
        };
      },
    }),
    ProductsModule,
    OrdersModule,
    OrderItemsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

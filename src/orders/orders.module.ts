import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsModule } from '../products/products.module';
import { OrderItemsModule } from '../order-items/order-items.module';
import { AuthModule } from '../auth/auth.module';

import { OrdersController } from './orders.controller';

import { OrdersService } from './orders.service';

import { OrdersRepository } from './orders.repository';

import { Order, OrderSchema } from './entities/order.entity';

@Module({
  imports: [
    ProductsModule,
    OrderItemsModule,
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderItemsService } from './order-items.service';

import { OrderItemsRepository } from './order-items.repository';

import { OrderItem, OrderItemSchema } from './entities/order-item.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderItem.name,
        schema: OrderItemSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [OrderItemsService, OrderItemsRepository],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}

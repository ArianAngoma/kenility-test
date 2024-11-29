import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OrderItem } from './entities/order-item.entity';

import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Injectable()
export class OrderItemsRepository {
  constructor(
    @InjectModel(OrderItem.name)
    private readonly orderItemModel: Model<OrderItem>,
  ) {}

  async createMany(orderItems: CreateOrderItemDto[]) {
    return this.orderItemModel.insertMany(orderItems);
  }
}

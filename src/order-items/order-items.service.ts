import { Injectable } from '@nestjs/common';

import { OrderItemsRepository } from './order-items.repository';

import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(private readonly orderItemsRepository: OrderItemsRepository) {}

  async createOrderItems(orderItems: CreateOrderItemDto[]) {
    return this.orderItemsRepository.createMany(orderItems);
  }
}

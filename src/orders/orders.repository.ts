import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from './entities/order.entity';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create(createOrderDto);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
  }

  async findByLastMonth(lastMonth: Date) {
    return this.orderModel.find({
      createdAt: {
        $gte: lastMonth,
      },
    });
  }

  async findOrderWithHighestTotalAmount() {
    return this.orderModel.findOne().sort({ totalAmount: -1 }).exec();
  }
}

import { Controller, Post, Body, Patch, Param } from '@nestjs/common';

import { OrdersService } from './orders.service';

import { CreateOrderBodyDto } from './dto/create-order-body.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { MongoIdValidationPipe } from '../common/pipes/mongo-id-validation.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderBodyDto: CreateOrderBodyDto) {
    return this.ordersService.create(createOrderBodyDto);
  }

  @Patch(':id')
  update(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }
}

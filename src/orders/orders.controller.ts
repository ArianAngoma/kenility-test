import { Controller, Post, Body, Patch, Param } from '@nestjs/common';

import { OrdersService } from './orders.service';

import { CreateOrderBodyDto } from './dto/create-order-body.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { Auth } from '../auth/decorators/auth/auth.decorator';

import { MongoIdValidationPipe } from '../common/pipes/mongo-id-validation.pipe';
import { GetUser } from '../auth/decorators/get-user/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Auth()
  create(
    @Body() createOrderBodyDto: CreateOrderBodyDto,
    @GetUser() user: User,
  ) {
    return this.ordersService.create(createOrderBodyDto, user.id);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }
}

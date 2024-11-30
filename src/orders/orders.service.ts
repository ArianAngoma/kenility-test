import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductsService } from '../products/products.service';
import { OrderItemsService } from '../order-items/order-items.service';

import { OrdersRepository } from './orders.repository';

import { CreateOrderBodyDto } from './dto/create-order-body.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderItemBodyDto } from '../order-items/dto/create-order-item-body.dto';

import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly productsService: ProductsService,
    private readonly orderItemsService: OrderItemsService,
  ) {}

  async create({ items }: CreateOrderBodyDto, userId: string) {
    const productIds = this.extractProductIds(items);
    const products = await this.productsService.validateProductIds(productIds);

    const totalAmount = this.calculateTotalAmount(items, products);
    const totalItems = this.calculateTotalItems(items);
    const dataOrderItems = this.createOrderItems(items, products);

    const order = await this.ordersRepository.create({
      totalAmount,
      totalItems,
      userId,
    });

    await this.orderItemsService.createOrderItems(
      dataOrderItems.map((item) => ({ ...item, orderId: order.id })),
    );

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.ordersRepository.update(id, updateOrderDto);
  }

  private extractProductIds(items: CreateOrderItemBodyDto[]): string[] {
    return items.map((item) => item.productId);
  }

  private calculateTotalAmount(
    items: CreateOrderItemBodyDto[],
    products: Product[],
  ): number {
    return items.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
      }

      return acc + product.price * item.quantity;
    }, 0);
  }

  private calculateTotalItems(items: CreateOrderItemBodyDto[]): number {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }

  private createOrderItems(
    items: CreateOrderItemBodyDto[],
    products: Product[],
  ) {
    return items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
      }

      return {
        price: product.price,
        productId: item.productId,
        quantity: item.quantity,
      };
    });
  }
}

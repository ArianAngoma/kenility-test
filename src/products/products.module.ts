import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './products.controller';

import { ProductsService } from './products.service';

import { ProductsRepository } from './products.repository';

import { Product, ProductSchema } from './entities/product.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
})
export class ProductsModule {}

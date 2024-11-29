import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './entities/product.entity';

import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, pictureFilename: string) {
    return await this.productModel.create({
      ...createProductDto,
      picture: pictureFilename,
    });
  }
}

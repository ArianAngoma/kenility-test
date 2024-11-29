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
    return this.productModel.create({
      ...createProductDto,
      picture: pictureFilename,
    });
  }

  async findOneById(id: string) {
    return this.productModel.findById(id);
  }

  async findOneBySku(sku: string) {
    return this.productModel.findOne({ sku });
  }

  async findByIds(ids: string[]) {
    return this.productModel.find({ _id: { $in: ids } });
  }
}

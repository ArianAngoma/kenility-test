import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

import { ProductsRepository } from './products.repository';

import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto, pictureFilename: string) {
    try {
      return await this.productRepository.create(
        createProductDto,
        pictureFilename,
      );
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(term: string) {
    const product = isValidObjectId(term)
      ? await this.productRepository.findOneById(term)
      : await this.productRepository.findOneBySku(term.toLowerCase());

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async validateProductIds(ids: string[]) {
    ids = Array.from(new Set(ids));

    const products = await this.productRepository.findByIds(ids);

    if (products.length !== ids.length) {
      throw new NotFoundException('Some products were not found');
    }

    return products;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException({
        message: 'Product already exists',
        cause: error.keyValue,
      });
    }

    throw new InternalServerErrorException('Could not create product');
  }
}

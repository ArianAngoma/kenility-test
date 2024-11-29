import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { ProductsRepository } from './products.repository';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private handleExceptions(error: any) {
    console.log(error);
    if (error.code === 11000) {
      throw new BadRequestException({
        message: 'Product already exists',
        cause: error.keyValue,
      });
    }

    throw new InternalServerErrorException('Could not create product');
  }
}

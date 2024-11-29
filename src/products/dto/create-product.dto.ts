import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly sku: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  readonly price: number;
}

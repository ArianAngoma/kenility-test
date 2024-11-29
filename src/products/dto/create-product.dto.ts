import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  readonly sku: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  readonly price: number;
}

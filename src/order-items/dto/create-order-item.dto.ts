import { IsInt, IsMongoId, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsMongoId()
  productId: string;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;
}

import { IsInt, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemBodyDto {
  @IsMongoId()
  productId: string;

  @IsInt()
  @Type(() => Number)
  quantity: number;
}

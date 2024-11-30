import { IsInt, IsMongoId } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  totalAmount: number;

  @IsInt()
  totalItems: number;

  @IsMongoId()
  userId: string;
}

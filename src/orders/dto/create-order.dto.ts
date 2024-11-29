import { IsInt } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  totalAmount: number;

  @IsInt()
  totalItems: number;
}

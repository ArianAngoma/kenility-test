import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateOrderItemBodyDto } from '../../order-items/dto/create-order-item-body.dto';

export class CreateOrderBodyDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemBodyDto)
  items: CreateOrderItemBodyDto[];
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { OrderStatus } from '../enums/order-status.enum';

@Schema({
  timestamps: true,
})
export class Order extends Document {
  @Prop({ type: Number, required: true })
  totalAmount: number;

  @Prop({ type: Number, required: true })
  totalItems: number;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

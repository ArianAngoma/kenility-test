import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { OrderStatus } from '../enums/order-status.enum';

@Schema({ collection: 'order' })
export class Order extends Document {
  @Prop({ type: Number, required: true, alias: 'total_amount' })
  totalAmount: number;

  @Prop({ type: Number, required: true, alias: 'total_items' })
  totalItems: number;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop({ type: Boolean, default: false, alias: 'is_paid' })
  isPaid: boolean;

  @Prop({ type: Date, alias: 'paid_at' })
  paidAt?: Date;

  @Prop({ type: Date, default: Date.now, alias: 'created_at' })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now, alias: 'updated_at' })
  updatedAt: Date;

  /*@Prop({ type: [{ type: Types.ObjectId, ref: 'OrderItem' }] })
  orderItems: Types.ObjectId[];*/
}

export const OrderSchema = SchemaFactory.createForClass(Order);

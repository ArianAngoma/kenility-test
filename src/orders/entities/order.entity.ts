import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { OrderItem } from '../../order-items/entities/order-item.entity';

import { OrderStatus } from '../enums/order-status.enum';

@Schema({
  collection: 'order',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
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

  @Prop({ type: [{ type: Types.ObjectId, ref: OrderItem.name }] })
  orderItems: Types.ObjectId[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);

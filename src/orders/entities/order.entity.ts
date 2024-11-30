import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { User } from '../../auth/entities/user.entity';

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

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  userId: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

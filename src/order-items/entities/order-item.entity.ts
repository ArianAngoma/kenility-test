import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Schema()
export class OrderItem extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Product',
  })
  productId: Product;

  @Prop({ type: Number, default: 1 })
  quantity: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Order',
  })
  orderId: Order;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

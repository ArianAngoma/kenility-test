import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from '../../products/entities/product.entity';
import { Order } from '../../orders/entities/order.entity';

@Schema({ collection: 'order_item' })
export class OrderItem extends Document {
  @Prop({
    type: Types.ObjectId,
    required: true,
    alias: 'product_id',
    ref: Product.name,
  })
  productId: Types.ObjectId;

  @Prop({ type: Number, default: 1 })
  quantity: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Types.ObjectId, ref: Order.name, alias: 'order_id' })
  orderId: Types.ObjectId;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

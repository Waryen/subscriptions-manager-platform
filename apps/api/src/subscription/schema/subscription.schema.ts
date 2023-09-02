import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  SubscriptionRate,
  SubscriptionStatus,
} from '@subscriptions-manager-platform/stores';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schema/user.schema';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema()
export class Subscription {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    default: SubscriptionRate.DAILY,
    type: String,
    enum: SubscriptionRate,
    required: true,
  })
  rate: SubscriptionRate;

  @Prop({
    default: SubscriptionStatus.ACTIVE,
    type: String,
    enum: SubscriptionStatus,
    required: true,
  })
  status: SubscriptionStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

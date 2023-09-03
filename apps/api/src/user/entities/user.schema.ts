import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Subscription } from '../../subscription/entities/subscription.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  firstname: string;

  @Prop({ required: true, type: String })
  lastname: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }],
  })
  subscriptions: Subscription[];
}

export const UserSchema = SchemaFactory.createForClass(User);

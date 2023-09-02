import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Subscription } from '../../subscription/schema/subscription.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, String })
  password: string;

  @Prop({ required: true, String })
  firstname: string;

  @Prop({ required: true, String })
  lastname: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }],
  })
  subscription: Subscription[];
}

export const UserSchema = SchemaFactory.createForClass(User);

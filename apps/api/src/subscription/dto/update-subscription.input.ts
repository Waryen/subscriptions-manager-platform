import { Prop } from '@nestjs/mongoose';
import { CreateSubscriptionInput } from './create-subscription.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateSubscriptionInput extends PartialType(
  CreateSubscriptionInput
) {
  @IsString({ message: 'Invalid id property format, expected type string' })
  @Prop(() => String)
  id: string;
}

import {
  SubscriptionRate,
  SubscriptionStatus,
} from '@subscriptions-manager-platform/stores';
import { User } from '../../user/entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Subscription {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field({ defaultValue: 'No description provided' })
  description?: string;

  @Field(() => Number)
  price: number;

  @Field(() => SubscriptionRate, { defaultValue: SubscriptionRate.DAILY })
  rate: SubscriptionRate;

  @Field(() => SubscriptionStatus, { defaultValue: SubscriptionStatus.ACTIVE })
  status: SubscriptionStatus;

  @Field(() => User)
  user: User;
}

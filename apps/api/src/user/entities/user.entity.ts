import { Subscription } from '../../subscription/entities/subscription.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  _id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field(() => [Subscription])
  subscriptions: Subscription[];
}

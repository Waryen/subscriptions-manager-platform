import { InputType, Field, Int } from '@nestjs/graphql';
import {
  SubscriptionRate,
  SubscriptionStatus,
} from '@subscriptions-manager-platform/stores';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

@InputType()
export class CreateSubscriptionInput {
  @IsString({
    message: 'Invalid data type for name property, expecting string type',
  })
  @Field(() => String)
  name: string;

  @IsString({
    message:
      'Invalid data type for description property, expecting string type',
  })
  @Field(() => String)
  description: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 },
    { message: 'Invalid price number format' }
  )
  @Min(0.1, { message: 'price property must be greater than 0.1' })
  @Max(1000, { message: "price property can't be greater than 1000" })
  @Field(() => Int)
  price: number;

  @IsEnum(SubscriptionRate, {
    message: 'rate field must contain a value from SubscriptionRate enum',
  })
  @Field(() => SubscriptionRate, {
    defaultValue: SubscriptionRate.DAILY,
    nullable: false,
  })
  rate: SubscriptionRate;

  @IsEnum(SubscriptionStatus, {
    message: 'status field must contain a value from SubscriptionStatus enum',
  })
  @Field(() => SubscriptionStatus, {
    defaultValue: SubscriptionStatus.ACTIVE,
    nullable: false,
  })
  status: SubscriptionStatus;

  @IsNotEmpty({ message: 'property userId is required' })
  @Field(() => String)
  userId: string;
}

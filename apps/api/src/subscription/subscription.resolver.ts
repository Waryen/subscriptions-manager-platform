import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionInput } from './dto/create-subscription.input';
import { UpdateSubscriptionInput } from './dto/update-subscription.input';
import { Subscription } from './entities/subscription.entity';

@Resolver(() => Subscription)
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Mutation(() => Subscription)
  async createSubscription(
    @Args('createSubscriptionInput')
    createSubscriptionInput: CreateSubscriptionInput
  ) {
    return this.subscriptionService.create(createSubscriptionInput);
  }

  @Query(() => [Subscription], { name: 'subscriptions' })
  async findAll() {
    return this.subscriptionService.findAll();
  }

  @Query(() => Subscription, { name: 'subscription' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.subscriptionService.findOne(id);
  }

  @Mutation(() => Subscription)
  async updateSubscription(
    @Args('updateSubscriptionInput')
    updateSubscriptionInput: UpdateSubscriptionInput
  ) {
    return this.subscriptionService.update(
      updateSubscriptionInput.id,
      updateSubscriptionInput
    );
  }

  @Mutation(() => Subscription)
  async removeSubscription(@Args('id', { type: () => String }) id: string) {
    return this.subscriptionService.remove(id);
  }
}

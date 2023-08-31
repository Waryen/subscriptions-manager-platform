import {
  Subscription,
  SubscriptionRate,
} from '@subscriptions-manager-platform/stores';

export function getTotalCostPerMonth(subs: Subscription[]) {
  return Math.round(
    subs.reduce((acc, it) => {
      switch (it.rate) {
        case SubscriptionRate.DAILY:
          return acc + it.price * 30;
        case SubscriptionRate.WEEKLY:
          return acc + it.price * 4;
        case SubscriptionRate.MONTHLY:
          return acc + it.price;
        case SubscriptionRate.YEARLY:
          return acc + it.price / 12;
        default:
          throw new Error(
            `Missing or invalid rate property on object: ${JSON.stringify(it)}`
          );
      }
    }, 0)
  );
}

import {
  Subscription,
  SubscriptionRate,
  SubscriptionStatus,
} from '@subscriptions-manager-platform/stores';

export function getSubscriptionCosts(subs: Subscription[]) {
  const costs = subs.reduce(
    (acc, it) => {
      if (it.status === SubscriptionStatus.OFF) {
        return acc;
      }

      switch (it.rate) {
        case SubscriptionRate.DAILY:
          acc.costPerMonth += it.price * 30;
          acc.costPerDay += it.price;
          acc.costPerYear += it.price * 365;
          break;
        case SubscriptionRate.WEEKLY:
          acc.costPerMonth += (it.price / 7) * 30;
          acc.costPerDay += it.price / 7;
          acc.costPerYear += (it.price / 7) * 365;
          break;
        case SubscriptionRate.MONTHLY:
          acc.costPerMonth += it.price;
          acc.costPerDay += it.price / 30;
          acc.costPerYear += (it.price / 30) * 365;
          break;
        case SubscriptionRate.YEARLY:
          acc.costPerMonth += it.price / 12;
          acc.costPerDay += it.price / 365;
          acc.costPerYear += it.price;
          break;
        default:
          throw new Error(
            `Missing or invalid rate property on object: ${JSON.stringify(it)}`
          );
      }

      return acc;
    },
    { costPerMonth: 0, costPerDay: 0, costPerYear: 0 }
  );

  // Round and return the values to two decimal places
  return {
    costPerMonth: parseFloat(costs.costPerMonth.toFixed(2)),
    costPerDay: parseFloat(costs.costPerDay.toFixed(2)),
    costPerYear: parseFloat(costs.costPerYear.toFixed(2)),
  };
}

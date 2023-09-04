import { Alert, AlertIcon, Text, VStack } from '@chakra-ui/react';
import { Subscription } from '@subscriptions-manager-platform/stores';
import { getSubscriptionCosts } from '@subscriptions-manager-platform/utils';

type Props = {
  subscriptions: Subscription[];
};

export function SubscriptionsCosts({ subscriptions }: Props) {
  const costs = Object.entries(getSubscriptionCosts(subscriptions));

  return (
    <Alert status="info" my={5}>
      <AlertIcon />
      <VStack alignItems="start">
        {costs.map(([name, cost]) => (
          <Text key={name}>
            You are paying about{' '}
            <Text as="span" fontWeight="bold">
              {cost} €
            </Text>{' '}
            per{' '}
            <Text as="span" fontWeight="bold">
              {name}
            </Text>{' '}
            for your current subscriptions.
          </Text>
        ))}
      </VStack>
    </Alert>
  );
}

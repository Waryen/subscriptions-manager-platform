import { Alert, AlertIcon, Text, VStack } from '@chakra-ui/react';
import { Subscription } from '@subscriptions-manager-platform/stores';
import { getSubscriptionCosts } from '@subscriptions-manager-platform/utils';

type Props = {
  subscriptions: Subscription[];
};

export function TotalSubscriptions({ subscriptions }: Props) {
  const { costPerDay, costPerMonth, costPerYear } =
    getSubscriptionCosts(subscriptions);

  return (
    <Alert status="info" my={5}>
      <AlertIcon />
      <VStack alignItems="start">
        <Text>
          You are paying about{' '}
          <Text as="span" fontWeight="bold">
            {costPerDay} €
          </Text>{' '}
          per{' '}
          <Text as="span" fontWeight="bold">
            day
          </Text>{' '}
          for your current subscriptions
        </Text>
        <Text>
          You are paying about{' '}
          <Text as="span" fontWeight="bold">
            {costPerMonth} €
          </Text>{' '}
          per{' '}
          <Text as="span" fontWeight="bold">
            month
          </Text>{' '}
          for your current subscriptions
        </Text>{' '}
        <Text>
          You are paying about{' '}
          <Text as="span" fontWeight="bold">
            {costPerYear} €
          </Text>{' '}
          per{' '}
          <Text as="span" fontWeight="bold">
            year
          </Text>{' '}
          for your current subscriptions
        </Text>
      </VStack>
    </Alert>
  );
}

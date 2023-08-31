import { Alert, AlertIcon, Text } from '@chakra-ui/react';
import { Subscription } from '@subscriptions-manager-platform/stores';
import { getTotalCostPerMonth } from '@subscriptions-manager-platform/utils';

type Props = {
  subscriptions: Subscription[];
};

export function TotalSubscriptions({ subscriptions }: Props) {
  const totalPerMonth = getTotalCostPerMonth(subscriptions);

  return (
    <Alert status="info" my={5}>
      <AlertIcon />
      <Text>
        You are paying about{' '}
        <Text as="span" fontWeight="bold">
          {totalPerMonth} €
        </Text>{' '}
        per month for your current subscriptions
      </Text>
    </Alert>
  );
}

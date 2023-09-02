import { Button, Text, VStack } from '@chakra-ui/react';
import { SubscriptionsTable } from './subscriptions-table';
import { useState } from 'react';
import { CreateSubscription } from './create-subscription';
import { SubscriptionsCosts } from './subscriptions-costs';
import { useSubscriptionsStore } from '@subscriptions-manager-platform/stores';

export function Home() {
  const { subscriptions } = useSubscriptionsStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // create a subscription
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  return (
    <VStack>
      {!subscriptions.length && (
        <>
          <Text mb={5} textAlign="center">
            You don't have any subscriptions registered at the moment, please
            add one with the button below.
          </Text>
          <Button size="lg" onClick={openCreateModal}>
            Add a subscription
          </Button>
        </>
      )}
      {subscriptions.length && (
        <>
          <SubscriptionsCosts subscriptions={subscriptions} />
          <Button
            alignSelf="flex-start"
            size="lg"
            onClick={openCreateModal}
            my={1}
          >
            Add a subscription
          </Button>
          <SubscriptionsTable subscriptions={subscriptions} />
        </>
      )}
      <CreateSubscription
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
      />
    </VStack>
  );
}

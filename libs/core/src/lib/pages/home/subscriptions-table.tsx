import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { DeleteSubscription } from './delete-subscription';
import { EditSubscription } from './edit-subscription';
import { useState } from 'react';
import {
  useSubscriptionsStore,
  Subscription,
} from '@subscriptions-manager-platform/stores';

type Props = {
  subscriptions: Subscription[];
};

export function SubscriptionsTable({ subscriptions }: Props) {
  const { removeSubscription } = useSubscriptionsStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState<string>();

  const onEditButtonPress = (id: string) => {
    setSubscriptionId(id);
    setIsEditModalOpen(true);
  };

  const onDeleteButtonPress = (id: string) => {
    setSubscriptionId(id);
    setIsDeleteModalOpen(true);
  };

  const onConfirmSubscriptionDelete = () => {
    if (subscriptionId) {
      removeSubscription(subscriptionId);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <TableContainer width="full">
        <Table variant="simple" colorScheme="teal.500">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Rate</Th>
              <Th>Price</Th>
              <Th>Status</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {subscriptions.map((s) => (
              <Tr key={s.id}>
                <Td>{s.name}</Td>
                <Td>{s.description || 'No description provided'}</Td>
                <Td>{s.rate}</Td>
                <Td>{s.price}</Td>
                <Td>{s.status}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    onClick={() => onEditButtonPress(s.id)}
                  >
                    Edit
                  </Button>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => onDeleteButtonPress(s.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {subscriptionId && (
        <>
          <EditSubscription
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            subscriptionId={subscriptionId}
          />
          <DeleteSubscription
            isOpen={isDeleteModalOpen}
            onCancel={() => setIsDeleteModalOpen(false)}
            onDelete={onConfirmSubscriptionDelete}
            subscriptionId={subscriptionId}
          />
        </>
      )}
    </>
  );
}

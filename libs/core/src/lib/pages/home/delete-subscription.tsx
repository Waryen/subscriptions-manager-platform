import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react';
import { useSubscriptionsStore } from '@subscriptions-manager-platform/stores';

type Props = {
  isOpen: boolean;
  onDelete: () => void;
  onCancel: () => void;
  subscriptionId: string;
};

export function DeleteSubscription({
  onDelete,
  onCancel,
  isOpen,
  subscriptionId,
}: Props) {
  const { findSubscription } = useSubscriptionsStore();
  const subscription = findSubscription(subscriptionId);

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete subscription</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Do you really want to delete this subscription?</Text>
          <Text fontWeight="bold">{subscription?.name}</Text>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="space-between">
          <Button colorScheme="gray" onClick={onCancel}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={onDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

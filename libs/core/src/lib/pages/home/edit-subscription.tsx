import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  CreateSubscription,
  useSubscriptionsStore,
  SubscriptionRate,
} from '@subscriptions-manager-platform/stores';
import { useEffect, useMemo } from 'react';

type FormValues = CreateSubscription;

type Props = {
  isOpen: boolean;
  subscriptionId: string;
  onClose: () => void;
};

export function EditSubscription({ onClose, subscriptionId, isOpen }: Props) {
  const { findSubscription } = useSubscriptionsStore();
  const subscription = findSubscription(subscriptionId);
  const { updateSubscription } = useSubscriptionsStore();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: useMemo(() => subscription, [subscription]),
  });

  const subscriptionsRate = Object.entries(SubscriptionRate).map((s) => ({
    value: s[1],
    name: s[0],
  }));

  const onCancel = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    updateSubscription({ ...values, id: subscriptionId });
    reset();
    onClose();
  };

  // reset the default values when the subscription changes
  useEffect(() => {
    reset(subscription);
  }, [reset, subscription]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update a subscription</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <FormControl isRequired mb={3}>
              <FormLabel>Name</FormLabel>
              <Input {...register('name', { minLength: 3, required: true })} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Description</FormLabel>
              <Input {...register('description', { minLength: 3 })} />
            </FormControl>
            <FormControl isRequired mb={3}>
              <FormLabel>Rate</FormLabel>
              <Select {...register('rate', { required: true })}>
                {subscriptionsRate.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                {...register('price', {
                  min: 1,
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="space-between">
          <Button colorScheme="gray" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} colorScheme="teal">
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

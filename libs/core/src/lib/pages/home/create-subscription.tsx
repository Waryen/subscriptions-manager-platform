import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import {
  useSubscriptionsStore,
  SubscriptionRate,
  CreateSubscription,
} from '@subscriptions-manager-platform/stores';
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = CreateSubscription;

export function CreateSubscription({ isOpen, onClose }: Props) {
  const { createSubscription } = useSubscriptionsStore();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      description: '',
      name: '',
      price: 1,
      rate: SubscriptionRate.DAILY,
    },
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
    createSubscription(values);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a subscription</ModalHeader>
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
                  min: 0.1,
                  max: 10_000,
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
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

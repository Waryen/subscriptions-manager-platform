import { Heading, Link, VStack } from '@chakra-ui/react';
import { Routes } from '@subscriptions-manager-platform/utils';
import { Link as RLink } from 'react-router-dom';

export function NotFound() {
  return (
    <VStack>
      <Heading textAlign="center" color="teal.500">
        Error 404 - Page not found
      </Heading>
      <Link
        as={RLink}
        to={Routes.HOME}
        replace
        bgColor="teal.500"
        px={3}
        py={2}
        mt={5}
        color="white"
        rounded="md"
        _hover={{ bgColor: 'teal.400' }}
        _focus={{ bgColor: 'teal.400' }}
      >
        Back to subscriptions
      </Link>
    </VStack>
  );
}

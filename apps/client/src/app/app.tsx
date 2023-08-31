import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { router } from './router';

export default function App() {
  return (
    <ChakraProvider resetCSS>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

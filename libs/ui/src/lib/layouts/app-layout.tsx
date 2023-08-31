import { Text, Flex, Heading, Link } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  const currentYear = new Date().getFullYear().toString();

  return (
    <Flex flexDirection="column" maxWidth="full" minHeight="100vh" p={0}>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgColor="teal.500"
        p={10}
      >
        <Heading
          as="h1"
          mb={3}
          color="white"
          fontWeight="extrabold"
          textAlign="center"
        >
          Subscriptions manager
        </Heading>
        <Heading fontSize="lg" color="white" textAlign="center">
          A platform to manage your subscriptions. Take control over your money!
        </Heading>
      </Flex>
      <Flex flex={1} p={5} flexDirection="column">
        <Outlet />
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgColor="teal.500"
        p={10}
      >
        <Text color="white">
          Copyrights {currentYear} -{" "}
          <Link
            color="white"
            href="https://github.com/Waryen"
            textDecoration="underline"
            textUnderlineOffset={5}
            isExternal
            _hover={{ color: "teal.100" }}
            _focus={{ color: "teal.100" }}
          >
            Jonathan Gomand
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}

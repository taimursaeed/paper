import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex justifyContent="center" my="8">
      <Spinner
        thickness="4px"
        speed="1s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};

export default Loader;
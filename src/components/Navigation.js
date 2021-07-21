import { Box, Container, Flex, Heading, Input, Spacer } from "@chakra-ui/react";
export default function Navigation() {
  return (
    <Box bg="blue.500" py="2">
      <nav>
        <Container maxW="container.lg">
          <Flex>
            <Box>
              <Heading mb="2" color="white">
                Paper
              </Heading>
            </Box>
            <Spacer />
            <Box>
              <Input placeholder="Search" variant="flushed" color="white" />
            </Box>
          </Flex>
        </Container>
      </nav>
    </Box>
  );
}

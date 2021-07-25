import { Box, Container, Flex, Heading, Spacer } from "@chakra-ui/react";
import Search from "../features/search/search";
import { Link } from "react-router-dom";
export default function Navigation() {
  return (
    <Box bg="blue.500" py="2">
      <nav>
        <Container maxW="container.lg">
          <Flex>
            <Box>
              <Heading mb="2" color="white">
                <Link to="/">Paper</Link>
              </Heading>
            </Box>
            <Spacer />
            <Box>
              <Search />
            </Box>
          </Flex>
        </Container>
      </nav>
    </Box>
  );
}

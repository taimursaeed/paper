import { Box, Text, Container, Flex, Heading, Spacer } from "@chakra-ui/react";
import SearchInput from "./searchInput";
import { Link } from "react-router-dom";
import SignInButton from "./signInButton";
import useAuthState from "../service/useAuthState";
export default function Navigation() {
  const { user } = useAuthState();
  return (
    <Box bg="blue.500" py="2">
      <nav>
        <Container maxW="container.lg">
          <Flex alignItems="center">
            <Box>
              <Flex alignItems="center">
                <Heading mb="2" mr="4" color="white">
                  <Link to="/">Paper</Link>
                </Heading>
                {user && (
                  <Text color="white">
                    <Link to="/bookmarks">Bookmarks</Link>
                  </Text>
                )}
              </Flex>
            </Box>
            <Spacer />
            <Box>
              <Flex alignItems="center">
                <Box mr="5">
                  <SignInButton />
                </Box>
                <SearchInput />
              </Flex>
            </Box>
          </Flex>
        </Container>
      </nav>
    </Box>
  );
}

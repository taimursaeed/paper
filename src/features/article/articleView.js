import { Box, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
export default function ArticleView(props) {
  return (
    <Flex>
      <Box flex="2">
        <Heading as="h1" mb="4">
          {props.webTitle}
        </Heading>
        <Heading as="h2" size="md">
          {props.fields.trailText}
        </Heading>
        <Divider my="5" />
        <Text dangerouslySetInnerHTML={{ __html: props.fields.body }}></Text>
      </Box>
      <Box flex="1" alignSelf="start" pl="8">
        <Image
          boxSize="100%"
          src={
            props.fields.thumbnail ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
          }
          alt={props.webTitle}
          objectFit="contain"
          mb="2"
          rounded="xl"
        />
        <Text fontSize="xs" color="gray.500">
          {props.webTitle}
        </Text>
      </Box>
    </Flex>
  );
}
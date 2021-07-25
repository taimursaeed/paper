import {
  Box,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <LinkBox as="article" position="relative" width={props.size} height="100%">
      <LinkOverlay as={Link} to={`/${props.id}`}>
        <Image
          boxSize="100%"
          src={
            props.fields.thumbnail ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
          }
          alt={props.webTitle}
          objectFit="cover"
        />
        <Box
          bg="rgba(49 ,130, 206,0.9)"
          p="3"
          color="white"
          width="100%"
          height="135px"
          position="absolute"
          bottom="0"
          zIndex="1"
        >
          <Heading size="md" mb="2" noOfLines={2}>
            {props.webTitle}
          </Heading>
          <Text fontSize="sm" noOfLines={2}>
            {props.fields.trailText}
          </Text>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
}

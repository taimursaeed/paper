import React from "react";
import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

function ArticleSkeleton() {
  return (
    <Flex>
      <Box flex="2">
        <Skeleton height="50px" width="160px" spacing="4"/>
        <Skeleton height="20px" mt="4" spacing="4"/>
        <Skeleton height="20px" mt="4" spacing="4"/>
        <SkeletonText mt="4" noOfLines={2} spacing="4"/>
        <SkeletonText mt="8" noOfLines={30} spacing="4"/>
      </Box>
      <Box flex="1" alignSelf="start" pl="8">
        <Skeleton height="200px"/>
        <SkeletonText mt="4" noOfLines={2} spacing="2"/>
      </Box>
    </Flex>
  );
}

export default ArticleSkeleton;
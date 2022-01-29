import React from "react";
import { Grid, Skeleton } from "@chakra-ui/react";

function BookmarkSkeleton() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="6" mb="12">
      <Skeleton height="350px"/>
      <Skeleton height="350px"/>
      <Skeleton height="350px"/>
    </Grid>
  );
}

export default BookmarkSkeleton;
import React from "react";
import { Skeleton } from "@chakra-ui/react";
import ArticleSectionSkeleton from "../../components/articleSectionSkeleton";

function HomeSkeleton() {
  return (
    <>
      <Skeleton width="200px" height="50px" mb="6"/>
      <ArticleSectionSkeleton/>
      <Skeleton width="200px" height="50px" mb="6"/>
      <ArticleSectionSkeleton/>
      <Skeleton width="200px" height="50px" mb="6"/>
      <ArticleSectionSkeleton/>
      <Skeleton width="200px" height="50px" mb="6"/>
      <ArticleSectionSkeleton/>
    </>
  );
}

export default HomeSkeleton;
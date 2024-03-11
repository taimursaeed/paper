import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ArticleSection from "../../components/articleSection";
import ArticleSorter from "../../components/articleSorter";
import HomeSkeleton from "./homeSkeleton";
import { useGetSectionArticlesQuery } from "./../../service/api";

const MESSAGES = {
  FETCH_ERROR: "There was an issue fetching the articles. Please try again.",
};

const RenderSection = ({ sectionName, isNewest }) => {
  const { data, isLoading, isError } = useGetSectionArticlesQuery(sectionName);
  const [articles, setArticles] = useState(data?.results);
  useEffect(() => {
    setArticles(isNewest ? data?.results : [...data?.results].reverse());
  }, [data, isNewest]);

  if (isError) return <Text>{MESSAGES.FETCH_ERROR}</Text>;
  if (isLoading && typeof data === "undefined") return <HomeSkeleton />;
  return (
    <>
      {articles && (
        <Box key={data.section.id}>
          <Heading mb="6" just="left">
            {data.section.webTitle}
          </Heading>
          <ArticleSection articles={articles} />
        </Box>
      )}
    </>
  );
};

export default function Home() {
  const [isNewest, setIsNewest] = useState(true);
  const sections = ["news", "sport", "culture", "lifeandstyle"];
  const reverseOrder = () =>
    setIsNewest((prevState) => (prevState = !prevState));

  return (
    <>
      <Flex justifyContent="flex-end" mb="-12">
        <ArticleSorter onChange={reverseOrder} />
      </Flex>
      {sections.map((section, id) => (
        <RenderSection key={id} sectionName={section} isNewest={isNewest} />
      ))}
    </>
  );
}

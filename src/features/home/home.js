import { Button, Flex, Heading, Icon, Select, Spinner, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleSection from "./articleSection";
import {
  fetchSections,
  reverseArticles,
  selectAllArticles,
  selectError,
  selectStatus, setStatus
} from "./homeSlice";
import BookmarkButton from "../../components/bookmarkButton";
import ArticleSorter from "../../components/articleSorter";

export default function Home() {
  const articles = useSelector(selectAllArticles);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSections(["news", "sport", "culture", "lifeandstyle"]));
    }
    return () => {
      console.log("home cleanup");
      dispatch(setStatus("idle"));
      console.log("home status after dispatch:", status);
    };
  }, []);

  let content;
  if (status === "loading") {
    content = (
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
  } else if (status === "succeeded") {
    content = articles.map((section, id) => {
      return <Box key={id} >
        <Heading mb="6" just="left">{section.articles.section.webTitle}</Heading>
        <ArticleSection articles={section.articles.results}/>
      </Box>;
    });
  } else if (status === "failed") {
    content = { error };
  }

  const handleOrder = () => {
    dispatch(reverseArticles());
  };

  return (
    <>
      <Flex justifyContent="flex-end" mb="-12">
        <BookmarkButton type="view"/>
        <ArticleSorter onChange={handleOrder}/>
      </Flex>
      {content}
    </>
  );
}

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleSection from "../../components/articleSection";
import { fetchSections, reverseArticles, selectAllArticles, selectError, selectStatus, setStatus } from "./homeSlice";
import BookmarkButton from "../../components/bookmarkButton";
import ArticleSorter from "../../components/articleSorter";
import HomeSkeleton from "./homeSkeleton";
import { selectUser } from "../auth/authSlice";

const MESSAGES = {
  FETCH_ERROR: "There was an issue fetching the articles. Please try again."
};
export default function Home() {
  const articles = useSelector(selectAllArticles);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSections(["news", "sport", "culture", "lifeandstyle"]));
    return () => {
      dispatch(setStatus("idle"));
    };
  }, [dispatch]);

  let content;
  if (status === "loading") {
    content = <HomeSkeleton/>;
  } else if (status === "succeeded") {
    content = articles.map((section, id) => {
      return <Box key={id}>
        <Heading mb="6" just="left">{section.articles.section.webTitle}</Heading>
        <ArticleSection articles={section.articles.results}/>
      </Box>;
    });
  } else if (status === "failed") {
    console.log(error);
    content = <Text>{MESSAGES.FETCH_ERROR}</Text>;
  }

  const handleOrder = () => {
    dispatch(reverseArticles());
  };

  return (
    <>
      <Flex justifyContent="flex-end" mb="-12">
        {user && <BookmarkButton type="view"/>}
        <ArticleSorter onChange={handleOrder}/>
      </Flex>
      {content}
    </>
  );
}

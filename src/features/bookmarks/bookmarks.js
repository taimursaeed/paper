import { useDispatch, useSelector } from "react-redux";
import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  fetchBookmarkArticles,
  reverseArticles,
  selectBookmarkArticles,
  selectError,
  selectStatus,
  setBookmarks
} from "./bookmarksSlice";
import ArticleSection from "../../components/articleSection";
import ArticleSorter from "../../components/articleSorter";
import ArticleSectionSkeleton from "../../components/articleSectionSkeleton";

const MESSAGES = {
  NO_ARTICLES: "There are no bookmarked articles",
  FETCH_ERROR: "There was an issue fetching the articles. Please try again."
};

const Bookmarks = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const bookmarkArticles = useSelector(selectBookmarkArticles);

  useEffect(() => {
    let articles = localStorage.getItem("articleIDs");
    if (articles !== null && articles !== "undefined" && articles.length > 0) {
      articles = articles.split(",");
    } else {
      articles = [];
    }
    dispatch(setBookmarks(articles));
    dispatch(fetchBookmarkArticles());
  }, [dispatch]);

  const handleOrder = () => {
    dispatch(reverseArticles());
  };
  if (status === "failed") console.log(error);

  let articleCards;
  if (status === "succeeded") {
    articleCards = bookmarkArticles?.length > 0 ?
      <ArticleSection articles={bookmarkArticles}/> :
      <Text textAlign="center">{MESSAGES.NO_ARTICLES}</Text>;
  }


  return (
    <>
      <Flex justifyContent="space-between">
        <Heading mb="6" just="left">Bookmarks</Heading>
        <Flex justifyContent="flex-end">
          <ArticleSorter onChange={handleOrder}/>
        </Flex>
      </Flex>
      {status === "failed" ?
        <Text textAlign="center">{MESSAGES.FETCH_ERROR}</Text> : ""}
      {status === "loading"
        ? <ArticleSectionSkeleton/>
        : articleCards}
    </>);
};

export default Bookmarks;
import { useDispatch, useSelector } from "react-redux";
import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  fetchBookmarkArticles,
  reverseArticles,
  selectBookmarkArticles,
  selectError,
  selectStatus, setBookmarks
} from "./bookmarksSlice";
import Loader from "../../components/loader";
import ArticleSection from "../home/articleSection";
import ArticleSorter from "../../components/articleSorter";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const bookmarkArticles = useSelector(selectBookmarkArticles);

  useEffect(() => {
    let articles = localStorage.getItem("articleIDs");
    if (articles !== null && articles !== "undefined") {
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

  return (
    <>
      <Flex justifyContent="space-between">
        <Heading mb="6" just="left">Bookmarks</Heading>
        <Flex justifyContent="flex-end">
          <ArticleSorter onChange={handleOrder}/>
        </Flex>
      </Flex>
      {status === "failed" ?
        <Text textAlign="center">There was an issue fetching the articles. Please try again.</Text> : ""}
      {status === "loading"
        ? <Loader/>
        : bookmarkArticles?.length > 0 ? <ArticleSection articles={bookmarkArticles}/> :
          <Text textAlign="center">There are no bookmarked articles</Text>}

    </>);
};

export default Bookmarks;
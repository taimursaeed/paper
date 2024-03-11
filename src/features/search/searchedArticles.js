import React, { useEffect, useState } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchedArticles,
  incrementPageIndex,
  reverseArticles,
  selectPageIndex,
  selectSearchedArticles,
  selectStatus
} from "./searchSlice";
import { useLocation } from "react-router-dom";
import ArticleSection from "../../components/articleSection";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import Loader from "../../components/loader";
import ArticleSorter from "../../components/articleSorter";
import ArticleSectionSkeleton from "../../components/articleSectionSkeleton";

const MESSAGES = {
  NO_ARTICLES: "No article found",
  FETCH_ERROR: "There was an issue fetching the articles. Please try again."
};

export default function SearchedArticles() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const searchTerm = query.get("term");
  const dispatch = useDispatch();

  const searchedArticles = useSelector(selectSearchedArticles);
  const status = useSelector(selectStatus);
  const currentPage = useSelector(selectPageIndex);

  const [isBottom, setIsBottom] = useState(false);
  useScrollPosition(({ prevPos, currPos }) => {
    if (!isBottom && ((currPos.y * -1) >= document.body.offsetHeight - window.innerHeight - 200)) {
      setIsBottom(true);
      dispatch(incrementPageIndex());
      dispatch(fetchSearchedArticles(searchTerm));
    } else {
      setIsBottom(false);
    }
  }, null, null, null, 200, null);

  useEffect(() => {
    dispatch(fetchSearchedArticles(searchTerm));
  }, [dispatch, searchTerm]);

  const handleOrder = () => {
    dispatch(reverseArticles());
  };

  const OnError = () => {
    return (status === "failed") ? <Text align="center">{MESSAGES.FETCH_ERROR}</Text> : false;
  };

  let articleCards;
  if (status === "loading" && currentPage === 1) articleCards = <ArticleSectionSkeleton/>;
  else {
    articleCards = searchedArticles?.results?.length > 0 ?
      <ArticleSection articles={searchedArticles.results}/> : <Text align="center">{MESSAGES.NO_ARTICLES}</Text>;
  }

  const InfiniteScrollSpinner = () => {
    return (isBottom && status === "loading") ? <Loader/> : false;
  };


  return (
    <>
      <Flex justifyContent="space-between">
        <Heading mb="6" just="left">{searchedArticles.section.webTitle}</Heading>
        <Flex justifyContent="flex-end">
          <ArticleSorter onChange={handleOrder}/>
        </Flex>
      </Flex>
      <OnError/>
      {articleCards}
      <InfiniteScrollSpinner/>
    </>
  );
}

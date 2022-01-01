import React, { useEffect, useState } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchedArticles,
  incrementPageIndex,
  reverseArticles,
  selectError,
  selectPageIndex,
  selectSearchedArticles,
  selectStatus
} from "./searchSlice";
import { useLocation } from "react-router-dom";
import ArticleSection from "../home/articleSection";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import Loader from "../../components/loader";
import BookmarkButton from "../../components/bookmarkButton";
import ArticleSorter from "../../components/articleSorter";

export default function SearchedArticles() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const searchTerm = query.get("term");
  const dispatch = useDispatch();

  const searchedArticles = useSelector(selectSearchedArticles);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const pageIndex = useSelector(selectPageIndex);

  const [isBottom, setIsBottom] = useState(false);
  useScrollPosition(({ prevPos, currPos }) => {
    if (!isBottom && ((currPos.y * -1) >= document.body.offsetHeight - window.innerHeight - 200)) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  }, null, null, null, 200, null);

  useEffect(() => {
    if (isBottom) {
      dispatch(incrementPageIndex());
      dispatch(fetchSearchedArticles(searchTerm));
    }
  }, [isBottom]);

  useEffect(() => {
    dispatch(fetchSearchedArticles(searchTerm));
  }, [searchTerm]);
  const handleOrder = () => {
    dispatch(reverseArticles());
  };
  return (
    <>
      <Flex justifyContent="space-between">
        <Heading mb="6" just="left">{searchedArticles.section.webTitle}</Heading>
        <Flex justifyContent="flex-end">
          <BookmarkButton type="view"/>
          <ArticleSorter onChange={handleOrder}/>
        </Flex>
      </Flex>
      {status === "failed" ?
        <Text align="center">There was an issue fetching the articles. Please try again.</Text> : ""}
      {status === "loading" && pageIndex == 1
        ? <Loader/>
        : searchedArticles?.results?.length > 0
          ? <ArticleSection articles={searchedArticles.results}/>
          : <Text align="center">No article found</Text>}
      {isBottom && status === "loading" ? <Loader/> : ""}
    </>
  );
}

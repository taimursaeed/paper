import React, { useEffect } from "react";
import { Button, Flex, Icon, Select, Spinner, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { reverseArticles } from "../home/homeSlice";
import { fetchSearchedArticles, selectError, selectSearchedArticles, selectStatus } from "./searchSlice";
import { useLocation } from "react-router-dom";
import ArticleSection from "../home/articleSection";

export default function SearchedArticles() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const searchTerm = query.get("term");
  const dispatch = useDispatch();

  const searchedArticles = useSelector(selectSearchedArticles);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchSearchedArticles(searchTerm));
  }, [searchTerm]);

  const handleOrder = () => {
    dispatch(reverseArticles());
  };

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
    content = searchedArticles.results.length > 0 ? <ArticleSection articles={searchedArticles}/> :
      <Text align="center">No article found</Text>;
  } else if (status === "error") {
    content = { error };
  }

  return (
    <>
      {searchedArticles.results.length > 0 ?
        <Flex justifyContent="flex-end" mb="-12">
          <Button colorScheme="blue" pl="4" pr="4" mr="4">
            <Icon width="1rem" mr="1">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                ></path>
              </svg>
            </Icon>
            Bookmarks
          </Button>
          <Select
            size="md"
            onChange={handleOrder}
            defaultValue="newest"
            width="200px"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </Select>
        </Flex> : ""}
      {content}
    </>
  );
}

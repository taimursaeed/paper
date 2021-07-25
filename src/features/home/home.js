import { Flex, Spinner, Select, Button, Icon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus as articleSetStatus } from "../article/articleSlice";
import {
  fetchSections,
  selectAllArticles,
  selectError,
  selectStatus,
  reverseArticles,
} from "./homeSlice";
import ArticleSection from "./articleSection";

export default function Home() {
  const articles = useSelector(selectAllArticles);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("home useeffect");
    if (status === "idle") {
      console.log("fetching home articles");
      dispatch(fetchSections(["news", "sport", "culture", "lifeandstyle"]));
    }
    dispatch(articleSetStatus("idle"));
  }, [status, dispatch]);

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
      return <ArticleSection articles={section.articles} key={id} />;
    });
  } else if (status === "error") {
    content = { error };
  }

  const handleOrder = () => {
    dispatch(reverseArticles());
  };

  return (
    <>
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
      </Flex>
      {content}
    </>
  );
}

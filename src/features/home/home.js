import { Button, Flex, Icon, Select, Spinner } from "@chakra-ui/react";
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
      return <ArticleSection articles={section.articles} key={id}/>;
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
      </Flex>
      {content}
    </>
  );
}

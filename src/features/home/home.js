import { Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus as articleSetStatus } from "../article/articleSlice";
import {
  fetchSections,
  selectAllArticles,
  selectError,
  selectStatus,
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
    content = articles.map((section) => {
      return <ArticleSection articles={section.articles} />;
    });
  } else if (status === "error") {
    content = { error };
  }

  return <>{content}</>;
}

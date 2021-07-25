import { Spinner, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchArticle,
  selectArticle,
  selectError,
  selectStatus,
} from "./articleSlice";
import { setStatus as homeSetStatus } from "../home/homeSlice";
import ArticleView from "./articleView";

export default function Article() {
  const article = useSelector(selectArticle);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    const trimmedLocation = location.pathname.replace("/", "");
    if (status === "idle") {
      dispatch(fetchArticle(trimmedLocation));
    }
    dispatch(homeSetStatus("idle"));
  }, [status, dispatch, location.pathname, article]);
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
    console.log(article);
    content = <ArticleView {...article} />;
  } else if (status === "error") {
    content = { error };
  }

  return <>{content}</>;
}

import { Spinner, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchArticle,
  selectArticle,
  selectError,
  selectStatus, setStatus
} from "./articleSlice";
import ArticleView from "./articleView";

export default function Article() {
  const article = useSelector(selectArticle);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    const trimmedLocation = location.pathname.replace("/", "");
    if (status === "idle") {
      dispatch(fetchArticle(trimmedLocation));
    }
    return () => {
      console.log("article cleanup");
      dispatch(setStatus("idle"));
      console.log("article status after dispatch:", status);
    };
  }, [location.pathname]);
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
    content = <ArticleView {...article} />;
  } else if (status === "failed") {
    content = { error };
  }

  return <>{content}</>;
}

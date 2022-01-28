import { Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchArticle, selectArticle, selectError, selectStatus, setStatus } from "./articleSlice";
import ArticleView from "./articleView";

export default function Article() {
  const article = useSelector(selectArticle);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    const trimmedLocation = location.pathname.replace("/", "");
    dispatch(fetchArticle(trimmedLocation));
    return () => {
      dispatch(setStatus("idle"));
    };
  }, [location.pathname, dispatch]);
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

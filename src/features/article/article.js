import React from "react";
import { useLocation } from "react-router-dom";
import ArticleView from "./articleView";
import ArticleSkeleton from "./articleSkeleton";
import { useGetArticleQuery } from "./articleSlice";

export default function Article() {
  const location = useLocation();
  const articleID = location.pathname.replace("/article", "");
  const {
    data: article,
    isLoading,
    isError,
  } = useGetArticleQuery(articleID);

  if (isLoading) {
    return <ArticleSkeleton />;
  }

  if (isError) {
    return <div>Error!</div>;
  }
  return <ArticleView {...article} />;
}

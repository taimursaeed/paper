import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchArticle, selectArticle, selectError, selectStatus, setStatus } from "./articleSlice";
import ArticleView from "./articleView";
import ArticleSkeleton from "./articleSkeleton";

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
    content = <ArticleSkeleton/>;
  } else if (status === "succeeded") {
    content = <ArticleView {...article} />;
  } else if (status === "failed") {
    content = { error };
  }

  return <>{content}</>;
}

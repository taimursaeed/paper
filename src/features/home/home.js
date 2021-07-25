import { Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card";
import {
  fetchHomeArticles,
  selectAllArticles,
  selectError,
  selectStatus,
} from "./homeSlice";
import { setStatus as articleSetStatus } from "../article/articleSlice";

export default function Home(props) {
  const articles = useSelector(selectAllArticles);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("home useeffect");
    if (status === "idle") {
      console.log("fetching home articles");
      dispatch(fetchHomeArticles());
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
    content = (
      <Grid templateColumns="repeat(3, 1fr)" gap="6">
        {articles.map((item) => (
          <GridItem key={item.id} h="350px">
            <Card {...item} size="xs" />
          </GridItem>
        ))}
      </Grid>
    );
  } else if (status === "error") {
    content = { error };
  }

  return <>{content}</>;
}

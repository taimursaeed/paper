import { Grid, GridItem } from "@chakra-ui/react";
import Card from "./card";

export default function ArticleSection({ articles }) {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="6" mb="12">
      {articles.map((article) => (
        <GridItem key={article.id} h="350px">
          <Card {...article} size="xss"/>
        </GridItem>
      ))}
    </Grid>
  );
}

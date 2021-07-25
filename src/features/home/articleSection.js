import { Grid, GridItem, Heading } from "@chakra-ui/react";
import Card from "../../components/card";
export default function ArticleSection({ articles }) {
  return (
    <>
      <Heading mb="6">{articles.section.webTitle}</Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap="6" mb="12">
        {articles?.results.map((item) => (
          <GridItem key={item.id} h="350px">
            <Card {...item} size="xs" />
          </GridItem>
        ))}
      </Grid>
    </>
  );
}

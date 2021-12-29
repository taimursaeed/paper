import React from "react";
import { Select } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const ArticleSorter = ({ onChange }) => {
  const dispatch = useDispatch();
  const handleOrder = () => {
    console.log("Should have sorted articles");
    if (typeof onChange === "function") onChange();
    // dispatch a reverse article action like following
    // dispatch(reverseArticles());
  };
  return (
    <Select
      size="md"
      onChange={handleOrder}
      defaultValue="newest"
      width="200px"
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
    </Select>
  );
};

export default ArticleSorter;
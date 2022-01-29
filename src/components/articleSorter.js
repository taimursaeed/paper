import React from "react";
import { Select } from "@chakra-ui/react";

const ArticleSorter = ({ onChange }) => {
  const handleOrder = () => {
    if (typeof onChange === "function") onChange();
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
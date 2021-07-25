import { Input } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSearch, selectSearch } from "./searchSlice";

export default function Search() {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(updateSearch(e.currentTarget.value));
  };
  return (
    <Input
      placeholder="Search"
      variant="flushed"
      color="white"
      value={search}
      onChange={handleChange}
    />
  );
}

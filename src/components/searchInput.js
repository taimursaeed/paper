import { Input } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash/function";

export default function SearchInput() {
  const history = useHistory();

  const changeHandler = (e) => {
    const searchTerm = e.target.value;
    console.log("Searching for: ", searchTerm);
    history.push(`/search?term=${searchTerm}`);
  };
  const debouncedChangeHandler = useMemo(() => {
    return debounce(changeHandler, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  return (
    <Input
      placeholder="Search"
      variant="flushed"
      color="white"
      onChange={debouncedChangeHandler}
    />
  );
}

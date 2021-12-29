import { Input } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash/function";
import { useDispatch } from "react-redux";

export default function SearchInput() {
  const history = useHistory();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const searchTerm = e.target.value;
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

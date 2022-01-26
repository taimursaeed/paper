import { Input } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash/function";

export default function SearchInput() {
  const history = useHistory();

  const changeHandler = (e) => {
    const searchTerm = e.target.value;
    history.push(`/search?term=${searchTerm}`);
  };

  const debouncedChangeHandler = () => {
    return debounce(changeHandler, 300);
  };

  return (
    <Input
      placeholder="Search"
      variant="flushed"
      color="white"
      onChange={debouncedChangeHandler()}
    />
  );
}

import { Input } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export default function Search() {
  const history = useHistory();
  const handleChange = (e) => {
    const searchTerm = e.currentTarget.value;
    history.push(`/search?term=${searchTerm}`);
  };

  return (
    <Input
      placeholder="Search"
      variant="flushed"
      color="white"
      onChange={handleChange}
    />
  );
}

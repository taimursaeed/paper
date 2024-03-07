import { Button, Icon, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBookmark, removeBookmark } from "../features/bookmarks/bookmarksSlice";

const BookmarkButton = ({ articleID, type, mb }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleClick = () => {
    if (type === "view") history.push(`/bookmarks`);
    else if (type === "add") {
      dispatch(addBookmark(articleID));
    } else if (type === "remove") {
      dispatch(removeBookmark(articleID));
    }
    if (type !== "view") {
      toast({
        description: `Article ${type === "add" ? "added" : "removed"} in Bookmarks`,
        status: 'success',
        duration: 1000,
        position: "bottom-right"
      });
    }
  };

  return (
    <Button colorScheme={`${type === "remove" ? "red" : "blue"}`} pl="4" pr="4" mr="4" mb={mb} onClick={handleClick}>
      <Icon width="1rem" mr="1">
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          ></path>
        </svg>
      </Icon>
      {type[0].toUpperCase()}{type.slice(1)} Bookmarks
    </Button>
  );
};

export default BookmarkButton;
import { Button, Icon } from "@chakra-ui/react";

const BookmarkButton = () => {
  return (
    <Button colorScheme="blue" pl="4" pr="4" mr="4">
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
      Bookmarks
    </Button>
  );
};

export default BookmarkButton;
import { createContext } from "react";

const BookmarkContext = createContext({
  bookmark: [],
  addBookmark: (news) => {},
  removeBookmark: (id) => {},
  checkIsABookmark: (id) => {},
});

export default BookmarkContext;

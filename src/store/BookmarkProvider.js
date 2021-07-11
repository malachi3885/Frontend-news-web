import React, { useState } from "react";

import BookmarkContext from "./bookmark-context";

function compare(a, b) {
  if (a.webPublicationDate < b.webPublicationDate) {
    return 1;
  }
  if (a.webPublicationDate > b.webPublicationDate) {
    return -1;
  }
  return 0;
}

const BookmarkProvider = (props) => {
  const [bookmark, setBookmark] = useState([]);

  const addNewstoBookmark = (news) => {
    const newBookmark = [...bookmark, news];
    newBookmark.sort(compare);
    setBookmark(newBookmark);
    return;
  };

  const removeNewsfromBookmark = (id) => {
    const newBookmark = bookmark.filter((news) => news.id !== id);
    setBookmark(newBookmark);
    return;
  };

  const checkIsABookmarkbyId = (id) => {
    const existingArticleIndex = bookmark.findIndex(
      (article) => article.id === id
    );
    const existingArticle = bookmark[existingArticleIndex];
    if (existingArticle) return true;
    return false;
  };

  const bookmarkContext = {
    bookmark: bookmark,
    addBookmark: addNewstoBookmark,
    removeBookmark: removeNewsfromBookmark,
    checkIsABookmark: checkIsABookmarkbyId,
  };

  return (
    <BookmarkContext.Provider value={bookmarkContext}>
      {props.children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;

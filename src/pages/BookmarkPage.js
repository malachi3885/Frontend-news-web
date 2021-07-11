import React, { useContext, useState } from "react";

import BookmarkContext from "../store/bookmark-context";
import NewsCard from "../components/NewsCard";
import "./BookmarkPage.css";

const BookmarkPage = () => {
  const bookmarkContext = useContext(BookmarkContext);
  const [bookmark, setBookmark] = useState(bookmarkContext.bookmark);
  const [orderBy, setOrderBy] = useState("newest");

  const changeOrderBy = (e) => {
    setOrderBy(e.target.value);
    setBookmark(bookmark.reverse());
  };

  return (
    <>
      <div className="top-bookmark">
        <h1>All bookmark</h1>
        <select
          className="selector"
          id="orderBy"
          value={orderBy}
          onChange={changeOrderBy}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
      <div className="bookmark-content">
        {bookmark.map((news, index) => {
          return (
            <div className="medium-size" key={index}>
              <NewsCard news={news} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BookmarkPage;

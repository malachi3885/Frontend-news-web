import React, { useContext, useState } from "react";

import BookmarkContext from "../store/bookmark-context";
import NewsCard from "../components/NewsCard";
import "./BookmarkPage.css";

const BookmarkPage = () => {
  const bookmarkContext = useContext(BookmarkContext);
  const [bookmark, setBookmark] = useState(bookmarkContext.bookmark);
  const [orderBy, setOrderBy] = useState("newest");
  //   const bookmark = bookmarkContext.bookmark;
  //   console.log(bookmark);

  const changeOrderBy = () => {
    setOrderBy((prevState) => {
      if (prevState === "newest") return "oldest";
      else if (prevState === "oldest") return "newest";
      return "newest";
    });
    setBookmark(bookmark.reverse());
  };

  return (
    <>
      <div className="top-bookmark">
        <h1>All bookmark</h1>
        <select id="orderBy" defaultValue={orderBy} onChange={changeOrderBy}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
      {bookmark.map((news) => {
        return <NewsCard key={news.id} news={news} />;
      })}
    </>
  );
};

export default BookmarkPage;

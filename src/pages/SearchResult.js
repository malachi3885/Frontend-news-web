import React, { useState } from "react";

import ViewBookmark from "../components/ViewBookmark";
import "./SearchResult.css";

const SearchResult = () => {
  const [orderBy, setOrderBy] = useState("newest");

  const handleChangeOrderBy = (e) => {
    setOrderBy(e.target.value);
  };
  return (
    <div className="search-result">
      <div className="top-search">
        <div className="top-search__left">
          <h1>Search results</h1>
        </div>
        <div className="top-search__right">
          <ViewBookmark />
          <select value={orderBy} onChange={handleChangeOrderBy}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>
      <div className="search-content"></div>
    </div>
  );
};

export default SearchResult;

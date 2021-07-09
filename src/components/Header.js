import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import useOutsideAlerter from "../hooks/alert-outside";
import "./Header.css";

const Header = () => {
  const [isSearching, setIsSearching] = useState(false);
  const history = useHistory();
  const searchInputRef = useRef();
  const searchAreaRef = useRef();

  const goToHomepage = () => {
    history.push("/");
  };

  const handleSearch = (e) => {
    history.push("/search/" + e.target.value);
  };

  const onClickSearching = () => {
    setIsSearching(true);
  };

  const onCloseSearching = () => {
    setIsSearching(false);
  };

  useOutsideAlerter(searchAreaRef, onCloseSearching);
  return (
    <header className="header">
      <h1 className="header-logo" onClick={goToHomepage}>
        <span>The</span>
        <span>Peaks</span>
      </h1>
      <div
        className={`header-search ${
          isSearching ? "searching-on" : "searching-off"
        }`}
        ref={searchAreaRef}
      >
        {isSearching && (
          <input
            placeholder="Search all news"
            ref={searchInputRef}
            onChange={handleSearch}
          />
        )}

        <AiOutlineSearch className="search-icon" onClick={onClickSearching} />
      </div>
    </header>
  );
};

export default Header;

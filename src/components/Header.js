import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import "./Header.css";

const Header = () => {
  const history = useHistory();
  const searchRef = useRef();

  const goToHomepage = () => {
    history.push("/");
  };

  const handleSearch = () => {};
  return (
    <header className="header">
      <h1 className="header-logo" onClick={goToHomepage}>
        <span>The</span>
        <span>Peaks</span>
      </h1>
      <div className="header-search">
        <input placeholder="Search all news" ref={searchRef} />
        <AiOutlineSearch className="search-icon" onClick={handleSearch} />
      </div>
    </header>
  );
};

export default Header;

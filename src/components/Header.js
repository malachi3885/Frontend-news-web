import React from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import "./Header.css";

const Header = () => {
  const history = useHistory();

  const goToHomepage = () => {
    history.push("/");
  };
  return (
    <header className="header">
      <h1 className="header-logo" onClick={goToHomepage}>
        <span>The</span>
        <span>Peaks</span>
      </h1>
      <AiOutlineSearch />
    </header>
  );
};

export default Header;

import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-logo">
        <span>The</span>
        <span>Peaks</span>
      </h1>
      <AiOutlineSearch />
    </header>
  );
};

export default Header;

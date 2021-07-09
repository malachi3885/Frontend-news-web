import React from "react";
import { useHistory } from "react-router";
import { BsBookmarkFill } from "react-icons/bs";

import "./ViewBookmark.css";

const ViewBookmark = () => {
  const history = useHistory();

  const goToBookmark = () => {
    history.push("/bookmark");
  };
  return (
    <div className="bookmark-tab" onClick={goToBookmark}>
      <BsBookmarkFill />
      <span>VIEW BOOKMARK</span>
    </div>
  );
};

export default ViewBookmark;

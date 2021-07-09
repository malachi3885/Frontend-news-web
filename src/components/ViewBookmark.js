import React from "react";
import { useHistory } from "react-router";

import "./ViewBookmark.css";

const ViewBookmark = () => {
  const history = useHistory();

  const goToBookmark = () => {
    history.push("/bookmark");
  };
  return (
    <div className="bookmark-tab" onClick={goToBookmark}>
      <p>VIEW BOOKMARK</p>
    </div>
  );
};

export default ViewBookmark;

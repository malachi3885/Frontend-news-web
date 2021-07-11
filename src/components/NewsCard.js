import React from "react";
import { useHistory } from "react-router-dom";

import "./NewsCard.css";

const NewsCard = ({ news, showImage = true, specialType = "none" }) => {
  //   console.log(specialType);
  const history = useHistory();

  const goToArticlePage = () => {
    history.push(`/article/${news.id}`);
  };

  //   const getFontSize = (textLength) => {
  //     const baseSize = 9;
  //     if (textLength >= baseSize) {
  //       textLength = baseSize - 2;
  //     }
  //     let fontSize;

  //     fontSize = baseSize - textLength - 0.5;
  //     return `${fontSize}vh`;
  //   };

  //   const boxes = document.querySelectorAll("h2");

  //   boxes.forEach((box) => {
  //     box.style.fontSize = getFontSize(box.textContent.length);
  //   });

  return (
    <div className="news-card" onClick={goToArticlePage}>
      {news.thumbnail && showImage && (
        <img className="media-card" src={news.thumbnail} alt="abc" />
      )}
      {!news.thumbnail && showImage && (
        <div className="the-peaks-image">
          <span className="the-peaks-image-top">The</span>
          <span className="the-peaks-image-bottom">Peaks</span>
        </div>
      )}
      <div
        className={`description-card ${
          showImage ? "show-image" : "dont-show-image"
        }`}
      >
        {specialType === "large" && (
          <h1 className="large-text">{news.webTitle}</h1>
        )}
        {specialType === "onlyText" && (
          <h1 className="onlyText-text">{news.webTitle}</h1>
        )}
        {specialType === "small" && (
          <h2 className="small-text">{news.webTitle}</h2>
        )}
        {specialType === "none" && (
          <h2 className="normal-text">{news.webTitle}</h2>
        )}

        {/* {specialType === "large" && (
          <p className="news-trail-text">{news.trailText}</p>
        )} */}
      </div>
    </div>
  );
};

export default NewsCard;

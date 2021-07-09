import React from "react";
import { useHistory } from "react-router-dom";

import "./NewsCard.css";

const NewsCard = ({ news }) => {
  const history = useHistory();

  const goToArticlePage = () => {
    history.push(`/article/${news.id}`);
  };

  return (
    <div className="news-card" onClick={goToArticlePage}>
      <img className="media-card" src={news.thumbnail} alt="abc" />
      <div className="description-card">
        <p>{news.webPublicationDate}</p>
        <h2 className="news-title">{news.webTitle}</h2>
        <p className="news-trail-text">{news.trailText}</p>
      </div>
    </div>
  );
};

export default NewsCard;

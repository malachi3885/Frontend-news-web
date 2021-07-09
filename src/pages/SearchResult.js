import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ViewBookmark from "../components/ViewBookmark";
import NewsCard from "../components/NewsCard";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./SearchResult.css";

const SearchResult = () => {
  const [searchNews, setSearchNews] = useState([]);
  const [orderBy, setOrderBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);
  const searchQuery = useParams().searchQuery.trim();
  const searchQueryReplaced = searchQuery.replace(/\s/g, " AND ");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://content.guardianapis.com/search?api-key=test&show-fields=thumbnail,trailText&order-by=${orderBy}&page-size=15&q=${searchQueryReplaced}&type=article`
      )
      .then((res) => {
        const response = res.data.response;
        setSearchNews(response.results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [searchQueryReplaced, orderBy]);

  const handleChangeOrderBy = (e) => {
    setOrderBy(e.target.value);
  };
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
          <div className="search-content">
            {searchNews.map((news) => (
              <NewsCard
                key={news.id}
                news={{
                  webPublicationDate: news.webPublicationDate,
                  id: news.id,
                  webTitle: news.webTitle.replace(/(\<.*?\>)/g, ""),
                  trailText: news.fields.trailText.replace(/(\<.*?\>)/g, ""),
                  thumbnail: news.fields.thumbnail,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResult;

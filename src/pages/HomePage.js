import React, { useEffect, useState } from "react";
import axios from "axios";

import NewsCard from "../components/NewsCard";
import ViewBookmark from "../components/ViewBookmark";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./HomePage.css";

const HomePage = () => {
  const [topNews, setTopNews] = useState([]);
  const [sportsNews, setSportsNews] = useState([]);
  const [orderBy, setOrderBy] = useState("newest");
  const [topNewsIsLoading, setTopNewsIsLoading] = useState(false);
  const [sportsNewsIsLoading, setSportsNewsIsLoading] = useState(false);

  useEffect(() => {
    setTopNewsIsLoading(true);
    setSportsNewsIsLoading(true);
    axios
      .get(
        `https://content.guardianapis.com/search?api-key=test&show-fields=thumbnail,trailText&order-by=${orderBy}&page-size=8&type=article`
      )
      .then((res) => {
        setTopNews(res.data.response.results);
        setTopNewsIsLoading(false);
      })
      .catch((err) => console.log(err.message));
    axios
      .get(
        `https://content.guardianapis.com/sport?api-key=test&show-fields=thumbnail,trailText&order-by=${orderBy}&page-size=3&type=article`
      )
      .then((res) => {
        setSportsNews(res.data.response.results);
        setSportsNewsIsLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, [orderBy]);

  const changeOrderBy = (e) => {
    setOrderBy(e.target.value);
  };

  return (
    <>
      {topNewsIsLoading && sportsNewsIsLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1>
            <div className="top-homepage">
              <div className="top-homepage__left">
                <h1>Top stories</h1>
              </div>
              <div className="top-homepage__right">
                <ViewBookmark />
                <select id="orderBy" value={orderBy} onChange={changeOrderBy}>
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>
              </div>
            </div>
          </h1>
          <div className="content-homepage">
            <div className="top-news">
              {topNews.map((news) => {
                return (
                  <NewsCard
                    key={news.id}
                    news={{
                      webPublicationDate: news.webPublicationDate,
                      id: news.id,
                      webTitle: news.webTitle.replace(/(\<.*?\>)/g, ""),
                      trailText: news.fields.trailText.replace(
                        /(\<.*?\>)/g,
                        ""
                      ),
                      thumbnail: news.fields.thumbnail,
                    }}
                  />
                );
              })}
            </div>
            <div className="sport-news">
              <h1>Sports</h1>
              {sportsNews.map((news) => {
                return (
                  <NewsCard
                    key={news.id}
                    news={{
                      webPublicationDate: news.webPublicationDate,
                      id: news.id,
                      webTitle: news.webTitle,
                      trailText: news.fields.trailText,
                      thumbnail: news.fields.thumbnail,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;

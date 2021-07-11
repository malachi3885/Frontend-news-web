import React, { useEffect, useState } from "react";
import axios from "axios";

import NewsCard from "../components/NewsCard";
import ViewBookmark from "../components/ViewBookmark";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./HomePage.css";

const mapToCard = (news, showImage, specialType = "none") => {
  return (
    <NewsCard
      key={news.id}
      news={{
        webPublicationDate: news.webPublicationDate,
        id: news.id,
        webTitle: news.webTitle.replace(/(\<.*?\>)/g, ""),
        trailText: news.fields.trailText.replace(/(\<.*?\>)/g, ""),
        thumbnail: news.fields.thumbnail,
      }}
      showImage={showImage}
      specialType={specialType}
    />
  );
};

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
                <select
                  className="selector"
                  id="orderBy"
                  value={orderBy}
                  onChange={changeOrderBy}
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>
              </div>
            </div>
          </h1>
          <div className="content-homepage">
            <div className="top-news">
              <div className="top-news__upper">
                <div className="top-news__upper-left">
                  {topNews.slice(0, 1).map((news, index) => (
                    <div className="large-size" key={index}>
                      {mapToCard(news, true, "large")}
                    </div>
                  ))}
                </div>
                <div className="top-news__upper-right">
                  {topNews.slice(1, 3).map((news, index) => (
                    <div className="small-size" key={index}>
                      {mapToCard(news, true, "small")}
                    </div>
                  ))}
                  {topNews.slice(3, 5).map((news, index) => (
                    <div className="card-no-image" key={index}>
                      {mapToCard(news, false, "onlyText")}
                    </div>
                  ))}
                </div>
              </div>
              <div className="top-news__lower">
                {topNews.slice(5).map((news, index) => (
                  <div className="medium-size" key={index}>
                    {mapToCard(news, true)}
                  </div>
                ))}
              </div>
            </div>
            <div className="sport-news">
              <h2>Sports</h2>
              <div className="sport-news-content">
                {sportsNews.map((news, index) => (
                  <div className="medium-size" key={index}>
                    {mapToCard(news, true)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;

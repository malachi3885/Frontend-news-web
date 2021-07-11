import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

import BookmarkContext from "../store/bookmark-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./ArticlePage.css";

const showDate = (date) => {
  const publicDate = new Date(date);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
    publicDate
  );
  const month = new Intl.DateTimeFormat("en", { month: "short" })
    .format(publicDate)
    .toUpperCase();
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    publicDate
  );
  const weekday = new Intl.DateTimeFormat("en", { weekday: "short" })
    .format(publicDate)
    .toUpperCase();
  const hour = publicDate.getHours();
  const minute =
    (publicDate.getMinutes() < 10 ? "0" : "") + publicDate.getMinutes();

  return `${weekday} ${day} ${month} ${year} ${hour}.${minute} ICT`;
};

const ArticlePage = ({ news }) => {
  const articleId = useParams().articleId;
  const [articleInfo, setArticleInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const bookmarkContext = useContext(BookmarkContext);
  const [isABookmark, setIsABookmark] = useState(null);
  const [isSaveBookmark, setIsSaveBookmark] = useState(false);
  const [isRemoveBookmar, setIsRemoveBookmark] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://content.guardianapis.com/${articleId}?api-key=test&show-fields=trailText,thumbnail&show-blocks=body`
      )
      .then((res) => {
        const data = res.data.response.content;
        const fetchBody = data.blocks.body[0].elements.filter(
          (block) => block.type === "text"
        );
        setArticleInfo({
          webPublicationDate: data.webPublicationDate,
          id: data.id,
          webTitle: data.webTitle.replace(/(\<.*?\>)/g, ""),
          trailText: data.fields.trailText.replace(/(\<.*?\>)/g, ""),
          thumbnail: data.fields.thumbnail,
          body: fetchBody,
        });
        setIsABookmark(bookmarkContext.checkIsABookmark(data.id));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  const addBookmark = () => {
    bookmarkContext.addBookmark(articleInfo);
    setIsABookmark(true);
    setIsRemoveBookmark(false);
    setIsSaveBookmark(true);
  };

  const removeBookmark = () => {
    bookmarkContext.removeBookmark(articleInfo.id);
    setIsABookmark(false);
    setIsSaveBookmark(false);
    setIsRemoveBookmark(true);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="article-page">
          <div className="article__upper">
            {isABookmark ? (
              <div className="add-bookmark" onClick={removeBookmark}>
                <BsBookmarkFill />
                <p>REMOVE BOOKMARK</p>
              </div>
            ) : (
              <div className="add-bookmark" onClick={addBookmark}>
                <BsBookmarkFill />
                <p>ADD BOOKMARK</p>
              </div>
            )}

            <div className="top-article">
              <div className="published-date">
                {articleInfo.webPublicationDate &&
                  showDate(articleInfo.webPublicationDate)}
              </div>
              <br />
              <div className="article-title">{articleInfo.webTitle}</div>
              <br />

              <div className="trail-text">{articleInfo.trailText}</div>
              <br />

              <hr />
              <br />
            </div>
          </div>
          <div className="article__lower">
            <div className="article__lower-right">
              <img
                className="article-image"
                src={articleInfo.thumbnail}
                alt=""
              />
            </div>
            <div className="article__lower-left">
              <div className="article-body">
                {articleInfo.body &&
                  articleInfo.body.map((block, index) => (
                    <div key={index}>
                      <div
                        className="container"
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: block.textTypeData.html,
                        }}
                      ></div>
                      <br />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {isRemoveBookmar && (
            <div className="remove-bottom-tab">
              <BsBookmark />
              <span>REMOVED FROM BOOKMARKS</span>
            </div>
          )}
          {isSaveBookmark && (
            <div className="add-bottom-tab">
              <BsBookmarkFill />
              <span>SAVED TO BOOKMARKS</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ArticlePage;

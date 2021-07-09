import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

import BookmarkContext from "../store/bookmark-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./ArticlePage.css";

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
        console.log(err);
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
          <div className="article__left">
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
                {articleInfo.webPublicationDate}
              </div>
              <br />
              <div className="article-title">{articleInfo.webTitle}</div>
              <br />

              <div className="headline">{articleInfo.trailText}</div>
              <br />
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
          <div className="article__right">
            <img className="article-image" src={articleInfo.thumbnail} alt="" />
          </div>
          {isRemoveBookmar && (
            <div className="remove-bottom-tab">
              <span>
                <BsBookmark />
              </span>
              <span>REMOVED FROM BOOKMARKS</span>
            </div>
          )}
          {isSaveBookmark && (
            <div className="add-bottom-tab">
              <span>
                <BsBookmarkFill />
              </span>
              <span>SAVED TO BOOKMARKS</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ArticlePage;

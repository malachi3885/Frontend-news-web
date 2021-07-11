import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ViewBookmark from "../components/ViewBookmark";
import NewsCard from "../components/NewsCard";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./SearchResult.css";

const mapToCard = (news, index) => {
  return (
    <div className="medium-size" key={index}>
      <NewsCard
        news={{
          webPublicationDate: news.webPublicationDate,
          id: news.id,
          webTitle: news.webTitle.replace(/(\<.*?\>)/g, ""),
          trailText: news.fields.trailText.replace(/(\<.*?\>)/g, ""),
          thumbnail: news.fields.thumbnail,
        }}
      />
    </div>
  );
};

let stateChange = null;

const compareInputs = (inputKeys, oldInputs, newInputs) => {
  inputKeys.forEach((key) => {
    const oldInput = oldInputs[key];
    const newInput = newInputs[key];
    if (oldInput !== newInput) {
      stateChange = key;
    }
  });
};
const useDependenciesDebugger = (inputs) => {
  const oldInputsRef = useRef(inputs);
  const inputValuesArray = Object.values(inputs);
  const inputKeysArray = Object.keys(inputs);
  useMemo(() => {
    const oldInputs = oldInputsRef.current;

    compareInputs(inputKeysArray, oldInputs, inputs);

    oldInputsRef.current = inputs;
  }, inputValuesArray); // eslint-disable-line react-hooks/exhaustive-deps
};

const SearchResult = () => {
  const [searchNews, setSearchNews] = useState([]);
  const [pages, setPages] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);
  const searchQuery = useParams().searchQuery.trim();
  const searchQueryReplaced = searchQuery.replace(/\s/g, " AND ");

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      if (currentPage < pages) {
        setCurrentPage((precState) => {
          return precState + 1;
        });
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (stateChange === "searchQueryReplaced") {
        setIsLoading(true);
        setCurrentPage(1);
        setOrderBy("newest");
        axios
          .get(
            `https://content.guardianapis.com/search?api-key=test&show-fields=thumbnail,trailText&order-by=newest&page-size=15&q=${searchQueryReplaced}&type=article&page=1`
          )
          .then((res) => {
            const response = res.data.response;
            setPages(response.pages);
            setSearchNews(response.results);

            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      } else if (stateChange === "orderBy") {
        setIsLoading(true);

        axios
          .get(
            `https://content.guardianapis.com/search?api-key=test&show-fields=thumbnail,trailText&order-by=${orderBy}&page-size=15&q=${searchQueryReplaced}&type=article&page=1`
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
      } else if (stateChange === "currentPage") {
        axios
          .get(
            `https://content.guardianapis.com/search?api-key=test&show-fields=thumbnail,trailText&order-by=${orderBy}&page-size=15&q=${searchQueryReplaced}&type=article&page=${currentPage}`
          )
          .then((res) => {
            const response = res.data.response;
            setPages(response.pages);
            if (currentPage === 1) {
              setSearchNews(response.results);
            } else {
              setSearchNews(searchNews.concat(response.results));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 300);
    return () => {
      clearTimeout(identifier);
    };
  }, [searchQueryReplaced, orderBy, currentPage]);

  useDependenciesDebugger({ searchQueryReplaced, orderBy, currentPage });

  const handleChangeOrderBy = (e) => {
    setOrderBy(e.target.value);
  };
  return (
    <div>
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
              <select
                className="selector"
                value={orderBy}
                onChange={handleChangeOrderBy}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>
          <div className="search-content">
            {searchNews.map((news, index) => mapToCard(news, index))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResult;

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import BookmarkProvider from "./store/BookmarkProvider";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import BookmarkPage from "./pages/BookmarkPage";
import ArticlePage from "./pages/ArticlePage";
import SearchResult from "./pages/SearchResult";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <BookmarkProvider>
      <div className="App">
        <Router>
          <Header />
          <main className="main">
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/bookmark" exact>
                <BookmarkPage />
              </Route>
              <Route path="/article/:articleId+">
                <ArticlePage />
              </Route>
              <Route path="/search/:searchQuery">
                <SearchResult />
              </Route>
              <Redirect to="/" />
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    </BookmarkProvider>
  );
}

export default App;

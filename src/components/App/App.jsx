import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';

import { getPosts } from '../../store/blogSlice';
import ArticlesList from '../ArticlesList/ArticlesList';
import ArticlePage from '../ArticlePage/ArticlePage';

import './App.scss';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="header">
          <div className="header__container">
            <Link to="/" className="header__logo">
              Realworld Blog
            </Link>
            <div className="header__user-section user-section">
              <a className="user-section__sign-in" href="#">
                Sign In
              </a>
              <a className="user-section__sign-up" href="#">
                Sign Up
              </a>
            </div>
          </div>
        </header>
        <main className="main">
          <div className="main__container">
            <Route exact path={['/', '/articles/']} component={ArticlesList} />
            <Route
              path="/articles/:slug"
              render={({ match }) => {
                return <ArticlePage slug={match.params.slug} />;
              }}
            />
          </div>
        </main>
      </div>
    </Router>
  );
}

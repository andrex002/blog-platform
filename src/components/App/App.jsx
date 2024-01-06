import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { logOut, getProfile } from '../../store/blogSlice';
import { UserMenuAuthorized } from '../UserMenuAuthorized/UserMenuAuthorized';
import { UserMenuUnauthorized } from '../UserMenuUnauthorized/UserMenuUnauthorized';
import ArticlesList from '../ArticlesList/ArticlesList';
import ArticlePage from '../ArticlePage/ArticlePage';
import { SignUpPage } from '../SignUpPage/SignUpPage';
import { SignInPage } from '../SignInPage/SignInPage';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { EditProfile } from '../EditProfile/EditProfile';
import { NewArticle } from '../NewArticle/NewArticle';
import { EditArticle } from '../EditArticle/EditArticle';

import css from './App.module.scss';

export function App() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getProfile());
  }, []);
  const { authorized, user } = useSelector((state) => state.blog);
  return (
    <Router>
      <div className={css.app}>
        <header className={css.header}>
          <div className={css.headerContainer}>
            <Link to="/" className={css.logo}>
              Realworld Blog
            </Link>
            <div className={css.userSection}>
              {authorized ? <UserMenuAuthorized user={user} logout={logOut} /> : <UserMenuUnauthorized />}
            </div>
          </div>
        </header>
        <main className={css.main}>
          <div className={css.mainContainer}>
            <Switch>
              <Route exact path={['/', '/articles/']} component={ArticlesList} />
              <Route
                exact
                path="/articles/:slug"
                render={({ match, history }) => {
                  return <ArticlePage slug={match.params.slug} history={history} />;
                }}
              />
              <Route path="/sign-up" component={SignUpPage} />
              <Route path="/sign-in" component={SignInPage} />
              <PrivateRoute path="/new-article" component={(router) => <NewArticle {...router} />} />
              <PrivateRoute path="/profile" component={(router) => <EditProfile {...router} />} />
              <PrivateRoute path="/articles/:slug/edit" component={(router) => <EditArticle {...router} />} />
              <Route path="*">
                <h1>404 – Страница не найдена</h1>
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { logOut } from '../../store/blogSlice';
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

import './App.scss';

export function App() {
  const { authorized, user } = useSelector((state) => state.blog);

  return (
    <Router>
      <div className="App">
        <header className="header">
          <div className="header__container">
            <Link to="/" className="header__logo">
              Realworld Blog
            </Link>
            <div className="header__user-section user-section">
              {authorized ? <UserMenuAuthorized user={user} logout={logOut} /> : <UserMenuUnauthorized />}
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
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/profile" render={() => PrivateRoute(EditProfile, authorized)} />
            <Route path="/new-article" render={(router) => <NewArticle {...router} />} />
            <Route
              path="/articles/:slug/edit"
              render={({ match }) => {
                return <EditArticle slug={match.params.slug} />;
              }}
            />
          </div>
        </main>
      </div>
    </Router>
  );
}

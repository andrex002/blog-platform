import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

import css from '../ArticlesList/ArticlesList.module.scss';

export function PrivateRoute({ component: Component, ...rest }) {
  const { authorized, loading } = useSelector((state) => state.blog);

  if (loading) return <Spin size="large" className={css.articlesSpin} />;
  return (
    <Route
      {...rest}
      render={(props) => {
        return !authorized ? <Redirect to="/sign-in" /> : <Component {...props} />;
      }}
    />
  );
}

PrivateRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.func,
};

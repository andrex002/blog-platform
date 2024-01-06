import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import css from './UserMenuAuthorized.module.scss';

export function UserMenuAuthorized({ user, logout }) {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Link to="/new-article" className={css.userSectionCreateArticle}>
        Create article
      </Link>
      <Link to="/profile" className={css.userSectionProfileLink}>
        <span className={css.userSectionUserName}>{user.username}</span>
        <Avatar className={css.userSectionAvatar} src={user.image} size={46} icon={<UserOutlined />} />
      </Link>
      <button
        className={css.userSectionLogoutBtn}
        onClick={() => {
          dispatch(logout());
        }}
      >
        Log Out
      </button>
    </React.Fragment>
  );
}

UserMenuAuthorized.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string,
  }),
  logout: PropTypes.func.isRequired,
};

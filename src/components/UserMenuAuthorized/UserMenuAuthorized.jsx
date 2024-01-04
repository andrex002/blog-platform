import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import './UserMenuAuthorized.scss';

export function UserMenuAuthorized({ user, logout }) {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Link to="/new-article" className="user-section__create-article">
        Create article
      </Link>
      <Link to="/profile" className="user-section__profile-link">
        <span className="user-section__user-name">{user.username}</span>
        <Avatar className="user-section__avatar" src={user.image} size={46} icon={<UserOutlined />} />
      </Link>
      <button
        className="user-section__logout-btn"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Log Out
      </button>
    </React.Fragment>
  );
}

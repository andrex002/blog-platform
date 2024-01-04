import { Link } from 'react-router-dom';
import './UserMenuUnauthorized.scss';
import { Fragment } from 'react';

export function UserMenuUnauthorized() {
  return (
    <Fragment>
      <Link to="/sign-in" className="user-section__sign-in" href="#">
        Sign In
      </Link>
      <Link to="/sign-up" className="user-section__sign-up" href="#">
        Sign Up
      </Link>
    </Fragment>
  );
}

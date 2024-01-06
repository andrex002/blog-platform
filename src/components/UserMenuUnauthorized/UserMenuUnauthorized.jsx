import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import css from './UserMenuUnauthorized.module.scss';

export function UserMenuUnauthorized() {
  return (
    <Fragment>
      <Link to="/sign-in" className={css.userSectionSignIn} href="#">
        Sign In
      </Link>
      <Link to="/sign-up" className={css.userSectionSignUp} href="#">
        Sign Up
      </Link>
    </Fragment>
  );
}

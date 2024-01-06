import PropTypes from 'prop-types';

import css from './Notification.module.scss';

export function Notification({ children }) {
  return (
    <div className={css.notification}>
      <div className={css.notificationLogo}>!</div>
      <div className={css.notificationText}>{children}</div>
    </div>
  );
}

Notification.propTypes = {
  children: PropTypes.string,
};

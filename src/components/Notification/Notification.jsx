import './Notification.scss';

export function Notification({ children }) {
  return (
    <div className="notification">
      <div className="notification__logo">!</div>
      <div className="notification__text">{children}</div>
    </div>
  );
}

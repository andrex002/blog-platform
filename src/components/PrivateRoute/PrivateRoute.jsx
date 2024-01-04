import { Redirect } from 'react-router-dom';

export function PrivateRoute(Component, authorized) {
  return authorized ? <Component /> : <Redirect to="/sign-in" />;
}

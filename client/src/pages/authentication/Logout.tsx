import * as React from 'react';
import { Redirect } from 'react-router-dom';

export interface LogoutProps {
  logout: () => void;
}

const Logout: React.SFC<LogoutProps> = ({ logout }) => {
  logout();
  return <Redirect to="/" />;
};

export default Logout;

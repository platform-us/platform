import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Loader from '../../components/Loader';

export interface LogoutProps {
  clearUser: () => void;
}

const Logout: React.FC<LogoutProps> = ({ clearUser }) => {
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    fetch('/logout', { method: 'POST' }).then(() => {
      clearUser();
      setDone(true);
    });
  }, [clearUser]);

  return done ? <Redirect to="/" /> : <Loader />;
};

export default Logout;

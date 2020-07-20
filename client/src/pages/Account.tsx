import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, User, UserContext } from '../App';

export interface AccountProps {}

const Account: React.FC<AccountProps> = () => {
  const user = React.useContext<User>(UserContext);
  if (!user) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Container>
        <h1>Hello, {user.username}</h1>
      </Container>
    );
  }
};

export default Account;

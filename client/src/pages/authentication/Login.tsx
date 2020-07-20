import * as React from 'react';

import { Container } from '../../App';

export interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  return (
    <Container>
      <h1>Log in</h1>
    </Container>
  );
};

export default Login;

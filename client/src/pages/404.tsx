import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../App';

export interface Error404Props {}

const Error404: React.FC<Error404Props> = () => {
  return (
    <Container>
      <h1>404 Error</h1>
      <h2>Page Not Found</h2>
      <Link to="/">Return to homepage</Link>
    </Container>
  );
};

export default Error404;

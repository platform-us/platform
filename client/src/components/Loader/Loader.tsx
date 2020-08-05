import * as React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(720deg);
    }
  }

  p {
    margin: 0;
    animation: rotate 1.5s infinite;
    font-size: 30px;
  }
`;

const Loader: React.FC = () => {
  return <Spinner><p>+</p></Spinner>;
};

export default Loader;

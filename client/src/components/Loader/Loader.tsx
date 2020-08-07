import * as React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  width: 100%;
  height: ${(props: { overlay: boolean }) =>
    props.overlay ? '100%' : '100vh'};
  position: ${(props: { overlay: boolean }) =>
    props.overlay ? 'absolute' : 'initial'};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  top: 0;
  left: 0;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(765deg);
    }
    100% {
      transform: rotate(1530deg);
    }
  }

  p {
    margin: 0;
    animation: rotate 3s infinite;
    font-size: 30px;
  }
`;

export interface LoaderProps {
  overlay?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ overlay = false }) => {
  return (
    <Spinner {...{ overlay }}>
      <p>+</p>
    </Spinner>
  );
};

export default Loader;

import * as React from 'react';
import styled from 'styled-components';

const Title = styled.h3`
  color: black;
  margin: 10px 0 0;
`;

const Container = styled.div`
  margin: 5px 0;
  background-color: white;
  width: 100%;
  border-radius: 7px;
  padding: 15px;
  box-shadow: 0 2px 6px #00000025;
`;

export interface CardProps {
  title?: string;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <>
      {title && <Title>{title}</Title>}
      <Container>{children}</Container>
    </>
  );
};

export default Card;

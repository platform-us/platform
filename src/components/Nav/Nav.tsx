import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: #f35454;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;

  nav {
    width: 100%;
    max-width: 800px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;

    h1 {
      cursor: pointer;
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: center;

      p {
        margin-right: 30px;
        cursor: pointer;
      }
    }
  }
`;

export interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  return (
    <Container>
      <nav>
        <h1>Platform</h1>
        <div>
          <p>My Platform</p>
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        </div>
      </nav>
    </Container>
  );
};

export default Nav;

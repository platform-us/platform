import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { SearchBar } from '../Search';
import { Link as UnstyledLink } from 'react-router-dom';
import { User, UserContext } from '../../App';

const Link = styled(UnstyledLink)`
  color: white;
  text-decoration: none;
`;

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
    max-width: ${({ theme }) => theme.width}px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;

    ${Link} {
      font-size: 24px;
      font-weight: 700;
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: center;

      ${Link} {
        font-size: 16px;
        font-weight: 400;
      }

      div {
        ${Link} {
          margin-right: 20px;
        }
      }
    }
  }
`;

export interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const user = React.useContext<User>(UserContext);

  return (
    <Container>
      <nav>
        <Link to="/">Platform</Link>
        <SearchBar onClick={() => console.log('click')} />
        <div>
          {user ? (
            <div>
              <Link to={`/account/${user.username}/platforms`}>
                My Platforms
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/sign-up">Sign up</Link>
            </div>
          )}
          <Link to={user ? `/account/${user.username}` : '/login'}>
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          </Link>
        </div>
      </nav>
    </Container>
  );
};

export default Nav;

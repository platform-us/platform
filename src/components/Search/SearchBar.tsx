import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Container = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #f67d7d;
  height: 30px;
  flex-grow: 1;
  max-width: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  cursor: pointer;
  color: white;
  font-size: 12px;
  margin: 0 10px;

  div {
    width: 12px;
  }
`;

export interface SearchBarProps {
  onClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <FontAwesomeIcon icon={faSearch} />
      <span>Search</span>
      <div />
    </Container>
  );
};

export default SearchBar;

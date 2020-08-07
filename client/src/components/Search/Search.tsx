import * as React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #0003;
  transition: opacity 0.2s ease;
  opacity: ${(props: { popped: boolean }) => (props.popped ? 1 : 0)};
  pointer-events: ${(props: { popped: boolean }) =>
    props.popped ? 'auto' : 'none'};
    cursor: ${(props: { popped: boolean }) =>
    props.popped ? 'pointer' : 'unset'};
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = styled.div`
  width: calc(100% - 30px);
  max-width: 500px;
  max-height: 80vh;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;

  .input {
    padding: 15px;
    background-color: #f35454;
  }

  .results {
    padding: 15px;
    overflow-y: auto;
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 30px;
  border: none;
  border-bottom: 3px solid #712727;
  background: none;
`;

export interface SearchProps {
  isOpen: boolean;
  close: () => void;
}

const Search: React.SFC<SearchProps> = ({ isOpen, close }) => {
  const [input, setInput] = React.useState<string>('');

  return (
    <>
      <Background popped={isOpen} onClick={close} />
      {isOpen && (
        <Container>
          <Popup>
            <div className="input">
              <Input
                type="text"
                placeholder="Search"
                value={input}
                onChange={evt => setInput(evt.target.value)}
              />
            </div>
            <div className="results">Results go here</div>
          </Popup>
        </Container>
      )}
    </>
  );
};

export default Search;

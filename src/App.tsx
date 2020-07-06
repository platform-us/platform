import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Platform from './pages/Platform';
import styled from 'styled-components';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  section {
    width: 100%;
    max-width: 800px;
    padding: 30px 15px;
  }
`;

// Each page should have a section as the root element
// You can import this for extra styles but you don't have to
export const Container = styled.section`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 42px;
    margin-bottom: 0;
  }

  h4 {
    font-size: 16px;
    margin: 0 0 30px;
  }
`;

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/">
          <Page>
            <Platform />
          </Page>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

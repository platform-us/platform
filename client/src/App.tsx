import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Platform from './pages/Platform';
import styled, { ThemeProvider } from 'styled-components';
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import Logout from './pages/authentication/Logout';
import Error404 from './pages/404';
import Account from './pages/Account';

const defaultTheme = {
  width: 1000,
};

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  section {
    width: 100%;
    max-width: ${({ theme }) => theme.width}px;
    padding: 30px 15px;
  }
`;

// Each page should have a <section> as the root element
// You can import this for extra styles but you don't have to
export const Container = styled.section`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 30px;
    margin-bottom: 0;
  }

  h4 {
    font-size: 16px;
    margin: 0 0 30px;
  }
`;

export type User = null | {
  username: String;
  id: String;
  email: String;
};

export const UserContext = React.createContext<User>(null);

const App: React.FC = () => {
  const [user, setUser] = React.useState<User>(null);

  React.useEffect(() => {
    (async () => {
      const jwt = localStorage.getItem('jwt');
      try {
        if (!jwt) throw Error('No JWT');
        const res = await fetch('/api/auth', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          localStorage.setItem('jwt', data.jwt);
        } else {
          throw Error('Invalid JWT');
        }
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <UserContext.Provider value={user}>
        <Router>
          <Nav />
          <Switch>
            {/* Authentication */}
            <Route path="/login">
              <Page>
                <Login />
              </Page>
            </Route>
            <Route path="/sign-up">
              <Page>
                <Signup />
              </Page>
            </Route>
            <Route path="/logout">
              <Logout logout={() => setUser(null)} />
            </Route>
            <Route path="/account">
              <Page>
                <Account />
              </Page>
            </Route>
            {/* Homepage */}
            <Route path="/" exact>
              <Page>
                <Platform />
              </Page>
            </Route>
            {/* 404 page */}
            <Route>
              <Page>
                <Error404 />
              </Page>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;

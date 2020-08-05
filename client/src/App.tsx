import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Nav from './components/Nav';
import Platform from './pages/platform/Platform';
import styled, { ThemeProvider } from 'styled-components';
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import Error404 from './pages/404';
import { setAccessToken } from './accessToken';
import { useUserDetailsQuery } from './generated/graphql';
import Account from './pages/account/Account';
import CreatePlatform from './pages/platform/CreatePlatform';
import Loader from './components/Loader';

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
  const [loading, setLoading] = React.useState(true);
  const { data, refetch } = useUserDetailsQuery();

  React.useEffect(() => {
    (async () => {
      const res = await fetch('/refresh_token', {
        method: 'POST',
        credentials: 'include',
      });
      const { accessToken } = await res.json();
      setAccessToken(accessToken);
      refetch();
      setLoading(false);
    })();
  }, [refetch]);

  React.useEffect(() => {
    if (data && data.me) {
      setUser(data.me);
    } else {
      setUser(null);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <UserContext.Provider value={user}>
        <Router>
          <Nav />
          <Page>
            <Switch>
              {/* Platforms */}
              <Route path="/platform/create" component={CreatePlatform} />
              <Route path="/platform/:id" component={Platform} />
              {/* Authentication */}
              <Route path="/login" children={<Login onLogin={refetch} />} />
              <Route path="/sign-up" children={<Signup onLogin={refetch} />} />
              <Route
                path="/logout"
                render={() => {
                  setUser(null);
                  return <Redirect to="/" />;
                }}
              />
              {/* Accounts */}
              <Route path="/account/:username" component={Account} />
              {/* Homepage */}
              <Route path="/" exact>
                <h1>Welcome to Platform</h1>
                <p>
                  {user
                    ? `You are logged in as ${user.username}`
                    : 'You are not logged in'}
                </p>
              </Route>
              {/* 404 page */}
              <Route component={Error404} />
            </Switch>
          </Page>
        </Router>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;

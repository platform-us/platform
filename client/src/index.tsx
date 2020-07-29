import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import App from './App';
import { getAccessToken, setAccessToken } from './accessToken';
import jwtDecode from 'jwt-decode';
import './index.css';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Path: ${path}`)
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: '/graphql',
});

const authLink = new ApolloLink((operation, next) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return next(operation);
});

const refreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch('/refresh_token', {
      method: 'POST',
      credentials: 'include',
    });
  },
  handleFetch: (accessToken: string) => {
    setAccessToken(accessToken);
  },
  handleError: (err: Error) => {
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error(err);
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'include',
  link: ApolloLink.from([refreshLink, errorLink, authLink, httpLink]),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

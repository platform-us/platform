import * as React from 'react';

import { Container } from '../../App';
import Form from '../../components/Core/Form';
import { useLoginMutation } from '../../generated/graphql';
import Card from '../../components/Card';
import { setAccessToken } from '../../accessToken';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Central = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
`;

export interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState();
  const [login] = useLoginMutation();
  const history = useHistory();

  const submit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      const res = await login({
        variables: {
          username,
          password,
        },
      });
      if (res && res.data) {
        setAccessToken(res.data.login.accessToken);
        onLogin();
        history.push('/');
      } else {
        throw Error('Unknown Error');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Container>
      <Central>
        <Card title="Log in">
          <Form onSubmit={submit}>
            {error && <p className="error">{error}</p>}
            <label>
              Username:
              <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={evt => setUsername(evt.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={evt => setPassword(evt.target.value)}
              />
            </label>
            <input type="submit" value="Log in" />
          </Form>
        </Card>
      </Central>
    </Container>
  );
};

export default Login;

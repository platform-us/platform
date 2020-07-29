import * as React from 'react';

import { Container } from '../../App';
import Form from '../../components/Core/Form';
import { useRegisterMutation, useLoginMutation } from '../../generated/graphql';
import Card from '../../components/Card';
import { setAccessToken } from '../../accessToken';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Central = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
`;

export interface SignupProps {
  onLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onLogin }) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState();
  const [Signup] = useRegisterMutation();
  const [Login] = useLoginMutation();
  const history = useHistory();

  const submit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      const res = await Signup({
        variables: {
          email,
          username,
          password,
        },
      });
      if (res && res.data) {
        const loginRes = await Login({ variables: { username, password } });
        if (loginRes && loginRes.data) {
          setAccessToken(loginRes.data.login.accessToken);
          onLogin();
          history.push('/');
        } else {
          throw Error('Unknown Error');
        }
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
              Email:
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={evt => setEmail(evt.target.value)}
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

export default Signup;

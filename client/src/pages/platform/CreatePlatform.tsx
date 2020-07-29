import * as React from 'react';

import { Container } from '../../App';
import Form from '../../components/Core/Form';
import { useCreatePlatformMutation } from '../../generated/graphql';
import Card from '../../components/Card';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Central = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
`;

const CreatePlatform: React.FC = () => {
  const [name, setName] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [error, setError] = React.useState();
  const [CreatePlatform] = useCreatePlatformMutation();
  const history = useHistory();

  const submit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      const res = await CreatePlatform({
        variables: {
          name,
          author,
          summary,
        },
      });
      if (res && res.data) {
        history.push(`/platform/${res.data.createPlatform}`);
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
        <Card title="Create New Platform">
          <Form onSubmit={submit}>
            {error && <p className="error">{error}</p>}
            <label>
              Platform Name:
              <input
                type="text"
                value={name}
                placeholder="Platform Name"
                onChange={evt => setName(evt.target.value)}
              />
            </label>
            <label>
              Author (optional):
              <input
                type="text"
                value={author}
                placeholder="Author"
                onChange={evt => setAuthor(evt.target.value)}
              />
            </label>
            <label>
              Summary (optional):
              <textarea
                value={summary}
                placeholder="Summary"
                onChange={evt => setSummary(evt.target.value)}
              />
            </label>
            <input type="submit" value="Create" />
          </Form>
        </Card>
      </Central>
    </Container>
  );
};

export default CreatePlatform;

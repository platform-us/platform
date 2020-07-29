import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../../App';
import { usePlatformsByUsernameQuery } from '../../generated/graphql';
import Card from '../../components/Card';
import Table from '../../components/Table';

const Account: React.FC = () => {
  const { username } = useParams();
  const { loading, data } = usePlatformsByUsernameQuery({
    variables: {
      username,
      take: 5,
    },
  });

  if (loading) return <div>Loading...</div>;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.user) return <div>User not found</div>;

  return (
    <Container>
      <Card title="User Information">
        <p>
          <b>Username:</b> {data.user.username}
        </p>
        <p>
          <b>Email:</b> {data.user.email}
        </p>
        <p>
          <b>User ID:</b> {data.user.id}
        </p>
      </Card>
      {data.platformsByUsername.length > 0 && (
        <Card title={`${data.user.username}'s Platforms`}>
          <Table
            headers={[
              {
                title: 'Name',
                component: ({ id, name }: { id: string; name: string }) => (
                  <Link to={`/platform/${id}`}>{name}</Link>
                ),
              },
              { title: 'Policies' },
            ]}
            rows={data.platformsByUsername.map(platform => ({
              id: platform.id,
              cells: [
                { id: platform.id, name: platform.name },
                platform.policies?.length || 0,
              ],
            }))}
          />
        </Card>
      )}
    </Container>
  );
};

export default Account;

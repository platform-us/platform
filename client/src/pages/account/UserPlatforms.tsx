import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../../App';
import { usePlatformsByUsernameQuery } from '../../generated/graphql';
import Card from '../../components/Card';
import Table from '../../components/Table';

const UserPlatforms: React.FC = () => {
  const { username } = useParams();
  const { loading, data } = usePlatformsByUsernameQuery({
    variables: {
      username,
    },
  });

  if (loading) return <div>Loading...</div>;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.user) return <div>User not found</div>;

  return (
    <Container>
      <h1>{data.user.username}'s Platforms</h1>
      <Card>
        {data.platformsByUsername.length > 0 ? (
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
        ) : (
          <p>{data.user.username} has no platforms</p>
        )}
      </Card>
    </Container>
  );
};

export default UserPlatforms;

import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../../App';
import { useUserPlatformsQuery } from '../../generated/graphql';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Loader from '../../components/Loader';

const Account: React.FC = () => {
  const { username } = useParams();
  const { loading, data } = useUserPlatformsQuery({
    variables: {
      username,
    },
  });

  if (loading) return <Loader />;

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
      {data.user.platforms && (
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
            rows={data.user.platforms.map(platform => ({
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

import * as React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Card/Card';
import { Container } from '../../App';
import { Button } from '../../components/Core';
import PolicyTable from '../../components/Table/PolicyTable';
import { useParams } from 'react-router-dom';
import { usePlatformQuery } from '../../generated/graphql';

export interface PlatformProps {}

const Platform: React.FC<PlatformProps> = () => {
  const { id } = useParams();
  const { loading, data } = usePlatformQuery({ variables: { id } });

  if (loading) return <div>Loading...</div>;

  if (!data || !data.platform) return <div>Policy not found</div>;

  console.log(data.platform.policies);

  return (
    <Container>
      <h1>{data.platform.name}</h1>
      <h4>By {data.platform.author || data.platform.user.username}</h4>
      {data.platform.summary && data.platform.summary}
      <Card title="Policies">
        {data.platform.policies && data.platform.policies.length > 0 ? (
          <PolicyTable policies={data.platform.policies} />
        ) : (
          <div>This platform has no policies</div>
        )}
      </Card>
      <Button icon={{ left: faPlus }} onClick={() => console.log('click')}>
        Add Policy
      </Button>
    </Container>
  );
};

export default Platform;

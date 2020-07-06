import * as React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Card from '../components/Card/Card';
import { Container } from '../App';
import { Button } from '../components/Core';
import PolicyTable, { Policy } from '../components/Table/PolicyTable';

export interface PlatformProps {}

const defaultPolicy: Policy = {
  name: 'Land Value Tax',
  author: 'Henry George',
  revenue: {
    inc: 200,
    dec: 15,
  },
  level: 'Federal',
  tags: ['Land Use', 'Tax', 'Urbanism'],
};

const Platform: React.FC<PlatformProps> = () => {
  const [policies, setPolicies] = React.useState<Policy[]>([]);

  const addPolicy = () => setPolicies(p => [...p, defaultPolicy]);

  return (
    <Container>
      <h1>My Awesome Policy</h1>
      <h4>By @succc_dem</h4>
      <Card title="Policies">
        <PolicyTable policies={policies} />
      </Card>
      <Button icon={{ left: faPlus }} onClick={addPolicy}>
        Add Policy
      </Button>
    </Container>
  );
};

export default Platform;

import * as React from 'react';
import { faPlus, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Table from '../components/Table';
import Card from '../components/Card/Card';
import { Container } from '../App';
import { Button } from '../components/Core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const Name = styled.div`
  p,
  h4 {
    margin: 0 !important;
  }

  p {
    color: #747474;
  }
`;

const Revenue = styled.div`
  p {
    margin: 0;
  }

  p:nth-child(1) {
    color: #179c4c;
  }

  p:nth-child(2) {
    color: #f35454;
  }
`;

const headers = [
  {
    title: 'Name',
    component: ({
      value: { name, author },
    }: {
      value: { name: string; author: string };
    }) => (
      <Name>
        <h4>{name}</h4>
        <p>By {author}</p>
      </Name>
    ),
  },
  {
    title: 'Revenue',
    component: ({
      value: { inc, dec },
    }: {
      value: { inc: number; dec: number };
    }) => (
      <Revenue>
        <p>
          <FontAwesomeIcon icon={faCaretUp} /> {inc}
        </p>
        <p>
          <FontAwesomeIcon icon={faCaretUp} /> {dec}
        </p>
      </Revenue>
    ),
  },
  { title: 'Level' },
  { title: 'Tags' },
];

export type Policy = {
  name: string;
  author?: string;
  revenue: {
    inc?: number;
    dec?: number;
  };
  level: 'Federal' | 'State' | 'Local';
  tags: string[];
};

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
        <Table
          headers={headers}
          rows={policies.map(policy => {
            return {
              id: policy.name,
              cells: [
                { name: policy.name, author: policy.author || 'unknown' },
                policy.revenue,
                policy.level,
                policy.tags.join(', '),
              ],
            };
          })}
        />
      </Card>
      <Button icon={{ left: faPlus }} onClick={addPolicy}>
        Add Policy
      </Button>
    </Container>
  );
};

export default Platform;

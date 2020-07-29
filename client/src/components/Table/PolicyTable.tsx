import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Table from './Table';
import { Revenue } from '../../generated/graphql';

const Name = styled.div`
  p,
  h4 {
    margin: 0 !important;
  }

  p {
    color: #747474;
    font-size: 12px;
  }
`;

const RevenueComponent = styled.div`
  text-align: center;

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

const Text = styled.p`
  text-align: center;
`;

const TextComponent = ({ value }: { value: string }) => <Text>{value}</Text>;

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
    component: ({ increase, decrease }: Revenue) => (
      <RevenueComponent>
        <p>
          <FontAwesomeIcon icon={faCaretUp} /> {increase}
        </p>
        <p>
          <FontAwesomeIcon icon={faCaretDown} /> {decrease}
        </p>
      </RevenueComponent>
    ),
  },
  {
    title: 'Level',
    component: TextComponent,
  },
  {
    title: 'Tags',
    component: TextComponent,
  },
];

// subset of the full policy
type Policy = {
  name: string;
  author?: string;
  revenue: {
    increase?: number;
    decrease?: number;
  };
  level: string;
  tags: { name: string }[];
};

export interface PolicyTableProps {
  policies: Policy[];
}

const PolicyTable: React.FC<PolicyTableProps> = ({ policies = [] }) => {
  return (
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
  );
};

export default PolicyTable;

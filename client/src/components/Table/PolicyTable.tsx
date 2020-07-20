import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Table from './Table';

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

const Revenue = styled.div`
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
          <FontAwesomeIcon icon={faCaretDown} /> {dec}
        </p>
      </Revenue>
    ),
  },
  {
    title: 'Level',
    component: ({ value }: { value: string }) => <Text>{value}</Text>,
  },
  {
    title: 'Tags',
    component: ({ value }: { value: string }) => <Text>{value}</Text>,
  },
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

export interface PolicyTableProps {
  policies: Policy[];
}

const PolicyTable: React.FC<PolicyTableProps> = ({ policies }) => {
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

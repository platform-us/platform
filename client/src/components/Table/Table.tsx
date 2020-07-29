import * as React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;

  thead > tr > th {
    text-transform: uppercase;
    font-size: 12px;
    color: #707070;
  }

  tbody > tr > td {
    padding: 5px 2px;
  }
`;

export interface TableProps {
  headers: {
    title: string;
    component?: (props: any) => JSX.Element;
  }[];
  rows: {
    // additional data for each row can go here
    id: any;
    cells: any[];
  }[];
}

const msg = 'Must be an equal number of column in the header and the body';

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {headers.map(({ title }) => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => {
          if (headers.length !== row.cells.length) throw new Error(msg);
          return (
            <tr key={row.id}>
              {row.cells.map((cell, i) => {
                const Component = headers[i].component;
                return (
                  <td key={headers[i].title}>
                    {Component === undefined ? cell : <Component {...cell} />}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default Table;

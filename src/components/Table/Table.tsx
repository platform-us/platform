import * as React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;

  thead > tr > th {
    text-transform: uppercase;
    font-size: 12px;
    color: #707070;
  }
`;

export interface TableProps {
  header: {
    title: string;
    component?: ({ children }: { children: any }) => JSX.Element;
  }[];
  rows: {
    // additional data for each row can go here
    id: any;
    cells: {
      id: any;
      value: any;
    }[];
  }[];
}

const msg = 'Must be an equal number of column in the header and the body';

const Table: React.FC<TableProps> = ({ header, rows }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {header.map(({ title }) => (
            <th>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => {
          if (header.length !== row.cells.length) throw new Error(msg);
          return (
            <tr key={row.id}>
              {row.cells.map((cell, i) => {
                const Component = header[i].component;
                return (
                  <td key={cell.id}>
                    {Component === undefined ? (
                      cell.value
                    ) : (
                      <Component>{cell.value}</Component>
                    )}
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

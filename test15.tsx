// OtherComponent.tsx
import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import ColumnFilterComponent from './ColumnFilterComponent';

const headers = ['Name', 'Age', 'Location'];

const data = [
  ['John', 30, 'New York'],
  ['Alice', 25, 'Los Angeles'],
  ['Bob', 40, 'Chicago'],
];

const OtherComponent: React.FC = () => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(headers);

  const handleColumnToggle = (column: string) => {
    if (visibleColumns.includes(column)) {
      setVisibleColumns(visibleColumns.filter((col) => col !== column));
    } else {
      setVisibleColumns([...visibleColumns, column]);
    }
  };

  return (
    <Container>
      <h1>Column Filter</h1>
      <ColumnFilterComponent
        headers={headers}
        visibleColumns={visibleColumns}
        onColumnToggle={handleColumnToggle}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((header, index) =>
              visibleColumns.includes(header) ? (
                <th key={index}>{header}</th>
              ) : null
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {rowData.map((cellData, cellIndex) =>
                visibleColumns.includes(headers[cellIndex]) ? (
                  <td key={cellIndex}>{cellData}</td>
                ) : null
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OtherComponent;

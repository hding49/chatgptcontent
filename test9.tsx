// ExpandableTableComponent.tsx
import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

interface ExpandableTableComponentProps {
  headers: string[];
  data: any[][];
}

const ExpandableTableComponent: React.FC<ExpandableTableComponentProps> = ({
  headers,
  data,
}) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const columnIndex = headers.indexOf(sortColumn);
    if (columnIndex !== -1) {
      return sortOrder === 'asc'
        ? a[columnIndex].localeCompare(b[columnIndex])
        : b[columnIndex].localeCompare(a[columnIndex]);
    }
    return 0;
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} onClick={() => handleSort(header)}>
              {header} {sortColumn === header && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((rowData, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <tr>
              {rowData.map((cellData, cellIndex) => (
                <td key={cellIndex}>
                  {cellData}
                </td>
              ))}
              <td>
                <Button
                  variant="link"
                  onClick={() =>
                    setExpandedRow(expandedRow === rowIndex ? null : rowIndex)
                  }
                >
                  {expandedRow === rowIndex ? 'Collapse' : 'Expand'}
                </Button>
              </td>
            </tr>
            {expandedRow === rowIndex && (
              <tr>
                <td colSpan={headers.length + 1}>
                  {/* Display additional details here */}
                  More details for row {rowIndex}
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

export default ExpandableTableComponent;

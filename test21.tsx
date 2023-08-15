import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

interface Header {
  name: string;
  value: string;
}

interface Data {
  audi_id: string;
  audit_title: string;
  audit_type: string;
}

interface ExpandableTableComponentProps {
  headers: Header[];
  data: Data[];
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
    const columnIndex = headers.findIndex(header => header.value === sortColumn);
    if (columnIndex !== -1) {
      return sortOrder === 'asc'
        ? a[sortColumn].localeCompare(b[sortColumn])
        : b[sortColumn].localeCompare(a[sortColumn]);
    }
    return 0;
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} onClick={() => handleSort(header.value)}>
              {header.name} {sortColumn === header.value && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((rowData, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <tr>
              {headers.map((header, cellIndex) => (
                header.value !== 'expand' ? (
                  <td key={cellIndex}>
                    {rowData[header.value]}
                  </td>
                ) : null
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
                  {headers.map((header, cellIndex) => (
                    header.value !== 'expand' ? (
                      <div key={cellIndex}>
                        <strong>{header.name}:</strong> {rowData[header.value]}
                      </div>
                    ) : null
                  ))}
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

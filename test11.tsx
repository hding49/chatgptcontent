// ExpandableTableComponent.tsx
import React, { useState } from 'react';
import { Table, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

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
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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

  const filteredData = sortedData.filter((rowData) =>
    rowData.some((cellData) =>
      cellData.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>
              <div className="d-flex align-items-center">
                <span onClick={() => handleSort(header)}>
                  {header}{' '}
                  {sortColumn === header && (sortOrder === 'asc' ? '↑' : '↓')}
                </span>
                <InputGroup size="sm" className="ml-2">
                  <InputGroup.Text>
                    <Search />
                  </InputGroup.Text>
                  <FormControl
                    placeholder={`Search ${header}`}
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </InputGroup>
              </div>
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((rowData, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <tr>
              {rowData.map((cellData, cellIndex) => (
                <td key={cellIndex}>{cellData}</td>
              ))}
              <td>
                <Button
                  variant="link"
                  onClick={() =>
                    setExpandedRow(expandedRow === rowIndex ? null : rowIndex)
                  }
                >
                  {expandedRow === rowIndex ? <i className="bi bi-arrow-up-circle"></i> : <i className="bi bi-arrow-down-circle"></i>}
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

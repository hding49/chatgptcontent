import React, { useState } from 'react';
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Search, ArrowUpCircle, ArrowDownCircle } from 'react-bootstrap-icons';

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
  const [showColumnTooltip, setShowColumnTooltip] = useState<string | null>(
    null
  );

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

  const clearSortAndSearch = () => {
    setSortColumn('');
    setSortOrder('asc');
    setSearchQuery('');
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
    rowData.some((cellData, cellIndex) =>
      headers.includes(headers[cellIndex]) &&
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
                  {sortColumn === header && (
                    sortOrder === 'asc' ? <ArrowUpCircle /> : <ArrowDownCircle />
                  )}
                </span>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip
                      id={`tooltip-${header}`}
                      show={showColumnTooltip === header}
                    >
                      <InputGroup size="sm">
                        <FormControl
                          placeholder={`Search ${header}`}
                          value={searchQuery}
                          onChange={handleSearch}
                        />
                        <InputGroup.Append>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setShowColumnTooltip(null)}
                          >
                            Reset
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => {
                              setShowColumnTooltip(null);
                              clearSortAndSearch();
                            }}
                          >
                            Apply
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                    </Tooltip>
                  }
                >
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setShowColumnTooltip(header)}
                  >
                    <Search />
                  </Button>
                </OverlayTrigger>
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
                headers.includes(headers[cellIndex]) ? (
                  <td key={cellIndex}>{cellData}</td>
                ) : null
              ))}
              <td>
                <Button
                  variant="link"
                  onClick={() =>
                    setExpandedRow(expandedRow === rowIndex ? null : rowIndex)
                  }
                >
                  {expandedRow === rowIndex ? <ArrowUpCircle /> : <ArrowDownCircle />}
                </Button>
              </td>
            </tr>
            {expandedRow === rowIndex && (
              <tr>
                <td colSpan={headers.length + 1}>
                  {/* Display additional details here */}
                  {rowData.map((cellData, cellIndex) => (
                    headers.includes(headers[cellIndex]) ? (
                      <div key={cellIndex}>
                        <strong>{headers[cellIndex]}:</strong> {cellData}
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

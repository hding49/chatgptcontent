// ColumnFilterComponent.tsx
import React from 'react';
import { Form } from 'react-bootstrap';

interface ColumnFilterComponentProps {
  headers: string[];
  visibleColumns: string[];
  onColumnToggle: (column: string) => void;
}

const ColumnFilterComponent: React.FC<ColumnFilterComponentProps> = ({
  headers,
  visibleColumns,
  onColumnToggle,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const column = event.target.name;
    onColumnToggle(column);
  };

  return (
    <Form>
      {headers.map((header, index) => (
        <Form.Check
          key={index}
          type="checkbox"
          label={header}
          name={header}
          checked={visibleColumns.includes(header)}
          onChange={handleCheckboxChange}
        />
      ))}
    </Form>
  );
};

export default ColumnFilterComponent;

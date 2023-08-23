import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface ColumnFilterModalProps {
  show: boolean;
  headers: string[];
  selectedColumns: string[];
  onColumnToggle: (column: string) => void;
  onApply: () => void;
}

const ColumnFilterModal: React.FC<ColumnFilterModalProps> = ({
  show,
  headers,
  selectedColumns,
  onColumnToggle,
  onApply,
}) => {
  return (
    <Modal show={show} onHide={onApply}>
      <Modal.Header closeButton>
        <Modal.Title>选择要显示的列</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {headers.map((header, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={header}
              name={header}
              checked={selectedColumns.includes(header)}
              onChange={() => onColumnToggle(header)}
            />
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onApply}>
          应用
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ColumnFilterModal;



import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ColumnFilterModal from './ColumnFilterModal'; // 路径可能不同

interface ColumnFilterComponentProps {
  headers: string[];
  visibleColumns: string[];
  onApply: (selectedColumns: string[]) => void;
}

const ColumnFilterComponent: React.FC<ColumnFilterComponentProps> = ({
  headers,
  visibleColumns,
  onApply,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(visibleColumns);

  const handleColumnToggle = (column: string) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter(col => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleApply = () => {
    onApply(selectedColumns);
    setShowModal(false);
  };

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>打开列过滤</Button>

      <ColumnFilterModal
        show={showModal}
        headers={headers}
        selectedColumns={selectedColumns}
        onColumnToggle={handleColumnToggle}
        onApply={handleApply}
      />
    </div>
  );
};

export default ColumnFilterComponent;

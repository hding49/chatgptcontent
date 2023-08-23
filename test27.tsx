/* columnFilterStyles.css */
.selected-column {
    background-color: blue !important;
    border: none !important;
    border-radius: 20px;
  }

  
  import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import './columnFilterStyles.css'; // 导入自定义样式

// ...（之前的代码）

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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
                className={selectedColumns.includes(header) ? 'selected-column' : ''}
                onChange={() => handleColumnToggle(header)}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleApply}>
            应用
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ColumnFilterComponent;

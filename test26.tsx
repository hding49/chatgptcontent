import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const column = event.target.name;
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter(col => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleApply = () => {
    onApply(selectedColumns);
    toggleModal();
  };

  return (
    <div>
      <Button onClick={toggleModal}>打开列过滤</Button>

      <Modal show={showModal} onHide={toggleModal}>
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
                onChange={handleCheckboxChange}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            取消
          </Button>
          <Button variant="primary" onClick={handleApply}>
            应用
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ColumnFilterComponent;


import React, { useState } from 'react';
import ColumnFilterComponent from './ColumnFilterComponent'; // 路径可能不同

const TableComponent: React.FC = () => {
  const headers = ['列1', '列2', '列3']; // 替换为实际的列标题
  const [visibleColumns, setVisibleColumns] = useState<string[]>(headers);

  const handleColumnApply = (selectedColumns: string[]) => {
    setVisibleColumns(selectedColumns);
  };

  // 渲染表格使用 visibleColumns 状态

  return (
    <div>
      {/* ...（渲染表格的代码） */}
      <ColumnFilterComponent headers={headers} visibleColumns={visibleColumns} onApply={handleColumnApply} />
    </div>
  );
};

export default TableComponent;

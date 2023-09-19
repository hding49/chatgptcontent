import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';

interface TableData {
  id: number;
  name: string;
  age: number;
}

const itemsPerPage = 5;

const SampleTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // 示例数据
  const data: TableData[] = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Alice', age: 25 },
    { id: 3, name: 'Bob', age: 35 },
    { id: 4, name: 'Eve', age: 28 },
    // 添加更多数据...
  ];

  // 根据当前页和每页显示的数量计算要显示的数据
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // 处理分页器点击事件
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
        />
      </Pagination>
    </div>
  );
};

export default SampleTable;



const [data, setData] = useState([]); // 存储所有数据
const [currentPage, setCurrentPage] = useState(1); // 当前页数
const itemsPerPage = 10; // 每页显示的数据项数量


const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentData = data.slice(startIndex, endIndex);


{currentData.map((item) => (
    // 渲染数据项
  ))}
  
  {/* 分页器 */}
  <Pagination>
    <Pagination.Prev
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
    />
    {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
      <Pagination.Item
        key={index + 1}
        active={index + 1 === currentPage}
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </Pagination.Item>
    ))}
    <Pagination.Next
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
    />
  </Pagination>
  
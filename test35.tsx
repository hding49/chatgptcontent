import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

const ExamplePagination = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const visiblePageRange = 3;

  // 计算可见页码范围
  const firstVisiblePage = Math.max(currentPage - Math.floor(visiblePageRange / 2), 1);
  const lastVisiblePage = Math.min(firstVisiblePage + visiblePageRange - 1, totalPages);

  // 渲染页码按钮
  const pageItems = [];
  for (let page = firstVisiblePage; page <= lastVisiblePage; page++) {
    pageItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  // 添加省略号
  if (firstVisiblePage > 1) {
    pageItems.unshift(<Pagination.Ellipsis key="ellipsis-start" />);
  }

  if (lastVisiblePage < totalPages) {
    pageItems.push(<Pagination.Ellipsis key="ellipsis-end" />);
  }

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {pageItems}
      <Pagination.Next
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default ExamplePagination;



import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

const ExamplePagination = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const maxVisiblePages = 5; // 最多显示的页码按钮数量

  // 计算要显示的页码范围
  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  // 如果不够最多显示的页码按钮数量，重新计算 startPage 和 endPage
  const shortfall = maxVisiblePages - (endPage - startPage + 1);
  if (shortfall > 0) {
    startPage = Math.max(startPage - shortfall, 1);
  }

  const pageItems = [];

  // 添加上一页按钮
  pageItems.push(
    <Pagination.Prev
      key="prev"
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
    />
  );

  // 添加省略号（如果有必要）
  if (startPage > 1) {
    pageItems.push(<Pagination.Ellipsis key="ellipsis-start" />);
  }

  // 渲染页码按钮
  for (let page = startPage; page <= endPage; page++) {
    pageItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  // 添加省略号（如果有必要）
  if (endPage < totalPages) {
    pageItems.push(<Pagination.Ellipsis key="ellipsis-end" />);
  }

  // 添加下一页按钮
  pageItems.push(
    <Pagination.Next
      key="next"
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === totalPages}
    />
  );

  return <Pagination>{pageItems}</Pagination>;
};

export default ExamplePagination;

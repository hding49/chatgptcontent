const filteredData = sortedData.filter((rowData) => {
    return rowData.some((cellData, cellIndex) => {
      const columnName = headers[cellIndex];
      if (columnName === 'Actions') {
        return true; // 对 "Actions" 列无需搜索
      }
      if (columnName === selectedColumn) {
        // 只对被选中的列执行搜索
        const cellValue = cellData.toString().toLowerCase();
        const searchKeyword = searchQuery.toLowerCase();
        return cellValue.includes(searchKeyword);
      }
      return true; // 对其他列保留
    });
  });



  const filteredData = data.filter((rowData) => {
    return rowData.some((cellData) => {
      const cellValue = cellData.toString().toLowerCase();
      const searchKeyword = searchQuery.toLowerCase();
      return cellValue.includes(searchKeyword);
    });
  });
  

  const filteredData = sortedData.filter((rowData) => {
    return rowData.some((cellData, cellIndex) => {
      const columnName = headers[cellIndex];
      if (columnName === 'Actions') {
        return true; // 对 "Actions" 列无需搜索
      }
      const cellValue = cellData.toString().toLowerCase();
      const searchKeyword = searchQueries[columnIndex].toLowerCase(); // 使用每列的搜索关键字
      return cellValue.includes(searchKeyword);
    });
  });

  
  
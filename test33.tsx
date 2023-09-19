npm install csv-parser


import * as CSV from 'csv-parser';

function generateCSV(data) {
  const csvData = [];
  csvData.push(['Header1', 'Header2', 'Header3']); // 添加CSV文件的表头

  data.forEach((item) => {
    csvData.push([item.field1, item.field2, item.field3]); // 添加每一行的数据
  });

  return CSV.stringify(csvData);
}


function downloadCSV(data) {
    const csvContent = generateCSV(data);
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
  
    URL.revokeObjectURL(url);
  }

  
  const data = [
    { field1: 'value1', field2: 'value2', field3: 'value3' },
    // 添加更多数据
  ];
  
  downloadCSV(data);
  
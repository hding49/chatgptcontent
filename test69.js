const data = [
    {field: "Issue Date", topic:"good"},
    {field: "Issue-Date", topic:"good"},
    {field: "Issue(Date)", topic:"good"},
  ];
  
  const newData = data.map(item => {
    const newField = item.field.replace(/[\s\-()]/g, '_').toLowerCase(); // 使用正则表达式替换空格、横线和括号为下划线，并将结果转换为小写
    return {...item, field: newField};
  });
  
  console.log(newData);

  

  const fs = require('fs');
  const csv = require('csv-parser');
  
  // 读取CSV文件
  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
      // 在此处处理每一行数据，将其转换为一个对象
      const jsonData = {
        column1: row.column1,
        column2: row.column2,
        // 继续根据 CSV 文件的列名添加其他字段
      };
      console.log(jsonData);
    })
    .on('end', () => {
      console.log('CSV文件已转换为JSON。');
    });

    

    const fs = require('fs');
const csv = require('csv-parser');

// 读取CSV文件
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    // 在此处处理每一行数据，将其转换为一个对象
    const jsonData = {
      column1: row.column1,
      column2: row.column2,
      // 继续根据 CSV 文件的列名添加其他字段
    };

    // 将 JSON 数据写入 JavaScript 文件
    const jsonDataString = JSON.stringify(jsonData, null, 2); // 格式化 JSON 字符串
    fs.writeFileSync('output.js', `const data = ${jsonDataString};\nmodule.exports = data;`, { flag: 'a' }); // 使用追加模式添加数据
  })
  .on('end', () => {
    console.log('CSV文件已转换为JSON并保存为output.js。');
  });

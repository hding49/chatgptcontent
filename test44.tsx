import React from 'react';

interface DataItem {
  name: string;
  age: number;
  city: string;
}

interface HeaderItem {
  key: keyof DataItem;
  value: string;
}

class CSVDownloadButton extends React.Component {
  private data: DataItem[] = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Alice', age: 25, city: 'Chicago' },
    // Add more data items as needed
  ];

  private headerList: HeaderItem[] = [
    { key: 'name', value: 'Name' },
    { key: 'age', value: 'Age' },
  ];

  downloadCSV = () => {
    const csvRows: string[] = [];

    // Add header row based on headerList
    const headerRow = this.headerList.map(headerItem => headerItem.value);
    csvRows.push(headerRow.join(','));

    // Add data rows based on headerList keys
    this.data.forEach(item => {
      const values = this.headerList.map(headerItem => String(item[headerItem.key]));
      csvRows.push(values.join(','));
    });

    // Combine rows into a CSV string
    const csvContent = csvRows.join('\n');

    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link and trigger download
    const csvURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'data.csv');
    document.body.appendChild(tempLink);
    tempLink.click();

    // Clean up
    window.URL.revokeObjectURL(csvURL);
    document.body.removeChild(tempLink);
  };

  render() {
    return <button onClick={this.downloadCSV}>Download CSV</button>;
  }
}

export default CSVDownloadButton;
import React from 'react';
import axios from 'axios';

const DownloadButton = () => {
  const downloadFile = async () => {
    try {
      const url = 'https://example.com/path/to/your/file'; // 替换为你的文件 URL
      const response = await axios.get(url, {
        responseType: 'blob', // 确保返回的数据是 Blob 类型
      });

      // 创建一个 URL 对象指向获取到的 Blob 数据
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      
      // 创建一个临时的下载链接
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', 'your-file-name.ext'); // 设置下载文件的名称和格式
      
      // 触发下载
      document.body.appendChild(link);
      link.click();
      
      // 移除临时链接
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <button onClick={downloadFile}>Download File</button>
  );
};

export default DownloadButton;

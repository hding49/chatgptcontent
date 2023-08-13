import React, { ReactNode } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header'; // 导入您的 Header 组件
import Sidebar from './Sidebar'; // 导入您的 Sidebar 组件

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col sm={3} className="sidebar">
          <Sidebar />
        </Col>
        <Col sm={9} className="main-content">
          <Header />
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout'; // 导入您的布局组件
import HomeScreen from './HomeScreen'; // 导入您的主页组件
import AboutScreen from './AboutScreen'; // 导入您的关于页面组件
import './Layout.css'; // 导入样式文件

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/about" element={<AboutScreen />} />
          {/* 添加其他路由 */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;


/* Layout CSS */
.sidebar {
    background-color: blue;
    height: 100vh; /* 设置侧边栏高度为整个视口高度 */
  }
  
  .main-content {
    padding: 20px;
    overflow: auto; /* 如果内容溢出，允许滚动 */
  }
  
  /* Header CSS */
  .header {
    background-color: gray;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
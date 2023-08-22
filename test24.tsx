import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSettings } from '@fortawesome/free-solid-svg-icons';

const MyTabs = () => {
  return (
    <Tab.Container id="my-tabs" defaultActiveKey="home">
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="home">
            <FontAwesomeIcon icon={faHome} className="mr-2" /> 首页
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="profile">
            <FontAwesomeIcon icon={faUser} className="mr-2" /> 用户
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="settings">
            <FontAwesomeIcon icon={faSettings} className="mr-2" /> 设置
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="home">首页内容</Tab.Pane>
        <Tab.Pane eventKey="profile">用户内容</Tab.Pane>
        <Tab.Pane eventKey="settings">设置内容</Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default MyTabs;

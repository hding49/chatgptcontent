import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Tabs activeKey={activeTab} onSelect={handleTabSelect}>
      <Tab eventKey="tab1" title="Tab 1">
        Content of Tab 1
      </Tab>
      <Tab eventKey="tab2" title="Tab 2">
        Content of Tab 2
      </Tab>
      <Tab eventKey="tab3" title="Tab 3">
        Content of Tab 3
      </Tab>
      <Tab eventKey="tab4" title="Tab 4">
        Content of Tab 4
      </Tab>
    </Tabs>
  );
};

export default TabsComponent;
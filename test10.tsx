// OtherComponent.tsx
import React from 'react';
import { Container } from 'react-bootstrap';
import ExpandableTableComponent from './ExpandableTableComponent';

const headers = ['Name', 'Age', 'Location', 'Actions'];
const data = [
  ['John', 30, 'New York'],
  ['Alice', 25, 'Los Angeles'],
  ['Bob', 40, 'Chicago'],
];

const OtherComponent: React.FC = () => {
  return (
    <Container>
      <h1>Other Component</h1>
      <ExpandableTableComponent headers={headers} data={data} />
    </Container>
  );
};

export default OtherComponent;

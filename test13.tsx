// OtherComponent.tsx
import React from 'react';
import { Container } from 'react-bootstrap';
import SearchInputComponent from './SearchInputComponent';

const topics = ['Technology', 'Science', 'Art', 'Sports', 'History'];

const OtherComponent: React.FC = () => {
  return (
    <Container>
      <h1>Search with Selection</h1>
      <SearchInputComponent options={topics} />
    </Container>
  );
};

export default OtherComponent;

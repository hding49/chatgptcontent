// SearchInputComponent.tsx
import React, { useState } from 'react';
import { InputGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';

interface SearchInputComponentProps {
  options: string[];
}

const SearchInputComponent: React.FC<SearchInputComponentProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSearch = () => {
    // Perform search using selectedOption and searchQuery
    // For demonstration purposes, you can log the search result
    const searchResult = `${selectedOption || 'All options'} - ${searchQuery}`;
    console.log('Search result:', searchResult);
  };

  return (
    <InputGroup>
      <DropdownButton
        as={InputGroup.Prepend}
        variant="outline-secondary"
        title={selectedOption || 'Select Option'}
      >
        {options.map((option, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <FormControl
        placeholder="Search..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <InputGroup.Append>
        <button className="btn btn-secondary" onClick={handleSearch}>
          Search
        </button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default SearchInputComponent;

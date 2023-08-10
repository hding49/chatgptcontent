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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        onChange={handleSearch}
      />
      <InputGroup.Append>
        <button className="btn btn-secondary" onClick={() => setSelectedOption(null)}>
          Clear
        </button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default SearchInputComponent;

import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

interface AutoCompleteProps {
  suggestions: string[];
}

const AutoCompleteInput: React.FC<AutoCompleteProps> = ({ suggestions }) => {
  const [inputText, setInputText] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputText(inputValue);
    const filtered = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <Form>
      <FormControl
        type="text"
        placeholder="输入搜索词..."
        value={inputText}
        onChange={handleInputChange}
      />
      {filteredSuggestions.length > 0 && (
        <ul>
          {filteredSuggestions.map(suggestion => (
            <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </Form>
  );
};

export default AutoCompleteInput;


import React from 'react';
import AutoCompleteInput from './AutoCompleteInput';

const suggestions = ['苹果', '香蕉', '橙子', '草莓', '西瓜', '葡萄', '柠檬'];

const App: React.FC = () => {
  return (
    <div className="App">
      <AutoCompleteInput suggestions={suggestions} />
    </div>
  );
};

export default App;

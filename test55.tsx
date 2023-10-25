import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

interface Word {
  key: string;
  value: string;
}

interface AutoCompleteProps {
  wordsList: Word[];
}

const AutoCompleteInput: React.FC<AutoCompleteProps> = ({ wordsList }) => {
  const [inputText, setInputText] = useState<string>('');
  const [isAutoCompleteMode, setAutoCompleteMode] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Word[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputText(inputValue);

    if (inputValue && inputValue[0] === '"' && inputValue.lastIndexOf('"') === 0)  {
      setAutoCompleteMode(true);
      const filtered = wordsList.filter(word =>
        word.value.toLowerCase().includes(inputValue.substring(1).toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setAutoCompleteMode(false);
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (selectedWord: Word) => {
    setInputText(`"${selectedWord.value}" = ""`);
    setAutoCompleteMode(false);
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
      {isAutoCompleteMode && filteredSuggestions.length > 0 && (
        <ul>
          {filteredSuggestions.map(word => (
            <li key={word.key} onClick={() => handleSuggestionClick(word)}>
              {word.value}
            </li>
          ))}
        </ul>
      )}
    </Form>
  );
};

export default AutoCompleteInput;

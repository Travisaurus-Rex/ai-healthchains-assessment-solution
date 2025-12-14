/*
  This component could have gone into _shared because in a real app, 
  it would certainly be a nice reusable piece of UI which contains its own debounce logic
  But I decided to keep it here since it's only relevant to the PatentList component
*/

import { useEffect, useState } from "react";

const PatientSearch = ({ onSearch, onClear, placeholder = 'Search patients...' }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value);
    }, 400);

    return () => clearTimeout(timeout);
  }, [value, onSearch]);

  const handleClear = () => {
    setValue('');
    onClear();
  };

  return (
    <div className="search-input-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default PatientSearch;
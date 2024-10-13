import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import Center from "../Center/Center";
import Flex from "../Flex/Flex";
import Spinner from "../Spinner/Spinner";
import "./Autocomplete.scss";

interface AutocompleteProps {
  suggestions: string[];
  onSelect: (selectedItem: string) => void;
  placeholder: string;
  startIcon?: React.ReactNode;
  loading?: boolean;
  onInputChange?: (inputValue: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  suggestions,
  onSelect,
  placeholder,
  startIcon,
  loading,
  onInputChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const autocompleteRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleInputFocus = () => inputRef.current?.focus();

  const handleClearInput = () => {
    setInputValue("");
    handleInputFocus();
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHighlightedIndex(-1); // Reset highlight when typing
    setInputValue(e.target.value);
  };

  const handleSelectItem = (item: string) => {
    onSelect(item);
    closeDropdown();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelectItem(filteredSuggestions[highlightedIndex]);
    } else if (e.key === "Escape") {
      closeDropdown();
    }
  };

  const handleBoxClick = () => {
    handleToggleDropdown();
    handleInputFocus();
  };

  // Filters suggestions and debounces the input change event
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredSuggestions(suggestions);
    } else {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }

    const handler = setTimeout(() => {
      if (onInputChange) onInputChange(inputValue);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, suggestions, onInputChange]);

  // Close dropdown when clicking outside the autocomplete
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="autocomplete" ref={autocompleteRef}>
      <Flex className="autocomplete__input-wrapper" onClick={handleBoxClick}>
        {startIcon && (
          <Center className="autocomplete__start-icon">{startIcon}</Center>
        )}

        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="autocomplete__input"
          onClick={handleToggleDropdown}
        />

        {loading && <Spinner className="autocomplete__spinner" />}

        {inputValue && (
          <Center>
            <FiX
              size={20}
              onClick={handleClearInput}
              className="autocomplete__clear-icon"
            />
          </Center>
        )}
      </Flex>

      {isDropdownOpen && (
        <ul className="autocomplete__suggestions">
          {loading ? (
            <li className="autocomplete__message">Loading...</li>
          ) : filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((item, index) => (
              <li
                key={item}
                onClick={() => handleSelectItem(item)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`autocomplete__suggestion ${
                  highlightedIndex === index
                    ? "autocomplete__suggestion--highlighted"
                    : ""
                }`}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="autocomplete__message">No options</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;

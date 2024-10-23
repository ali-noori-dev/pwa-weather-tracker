import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { AutocompleteOption, AutocompleteProps } from "../../../types";
import Center from "../Center/Center";
import Flex from "../Flex/Flex";
import Spinner from "../Spinner/Spinner";
import "./Autocomplete.scss";

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  onSelect,
  placeholder,
  startIcon,
  loading,
  onInputChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>(
    []
  );
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

  const handleSelectItem = (item: AutocompleteOption) => {
    onSelect(item);
    setInputValue(item.label);
    closeDropdown();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelectItem(filteredOptions[highlightedIndex]);
    } else if (e.key === "Escape") {
      closeDropdown();
    }
  };

  const handleBoxClick = () => {
    handleToggleDropdown();
    handleInputFocus();
  };

  // Filters options and debounces the input change event
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    }

    const handler = setTimeout(() => {
      if (onInputChange) onInputChange(inputValue);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, options, onInputChange]);

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
        <ul className="autocomplete__options">
          {loading ? (
            <li className="autocomplete__message">Loading...</li>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((item, index) => (
              <li
                key={item.label}
                onClick={() => handleSelectItem(item)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`autocomplete__option ${
                  highlightedIndex === index
                    ? "autocomplete__option--highlighted"
                    : ""
                }`}
              >
                {item.label}
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

import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { AutocompleteOption, AutocompleteProps } from "../../../types";
import Center from "../Center/Center";
import Flex from "../Flex/Flex";
import Spinner from "../Spinner/Spinner";
import Tooltip from "../Tooltip/Tooltip";
import "./Autocomplete.scss";

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  onSelect,
  placeholder,
  startIcon,
  loading,
  onInputChange,
  defaultOptions,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>(
    []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const autocompleteRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openDropdown = () => setIsDropdownOpen(true);
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
    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;

      case "ArrowUp":
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
        break;

      case "Enter":
        if (highlightedIndex >= 0) {
          handleSelectItem(filteredOptions[highlightedIndex]);
        }
        break;

      case "Escape":
        closeDropdown();
        break;

      default:
        break;
    }
  };

  const handleBoxClick = () => {
    openDropdown();
    handleInputFocus();
  };

  const renderDropdownContent = () => {
    if (!inputValue && defaultOptions?.length) {
      return renderOptions(defaultOptions);
    } else if (loading) {
      return renderMessage("Loading...");
    } else if (!filteredOptions.length) {
      return renderMessage("No options");
    } else {
      return renderOptions(filteredOptions);
    }
  };

  const renderMessage = (message: string) => {
    return <li className="autocomplete__message">{message}</li>;
  };

  const renderOptions = (options: AutocompleteOption[]) => {
    return options.map((item, index) => (
      <li
        key={item.label}
        onClick={() => handleSelectItem(item)}
        onMouseEnter={() => setHighlightedIndex(index)}
        className={`autocomplete__option ${
          highlightedIndex === index ? "autocomplete__option--highlighted" : ""
        }`}
      >
        {item.startIcon && (
          <span className="autocomplete__option__start-icon">
            {item.startIcon}
          </span>
        )}

        <span className="autocomplete__option__label">{item.label}</span>

        {item.endIcon && item.endIcon}
      </li>
    ));
  };

  // Filters options and debounces the input change event
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredOptions(options);
      onInputChange(inputValue);
    } else {
      const filtered = options.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);

      // Debounce for non-empty input values
      const handler = setTimeout(() => {
        onInputChange(inputValue);
      }, 700);

      return () => {
        clearTimeout(handler);
      };
    }
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
          onClick={openDropdown}
        />

        {loading && <Spinner className="autocomplete__spinner" />}

        {inputValue && (
          <Tooltip title="Clear">
            <Center>
              <FiX
                size={20}
                onClick={handleClearInput}
                className="autocomplete__clear-icon"
              />
            </Center>
          </Tooltip>
        )}
      </Flex>

      {isDropdownOpen && (
        <ul className="autocomplete__options">{renderDropdownContent()}</ul>
      )}
    </div>
  );
};

export default Autocomplete;

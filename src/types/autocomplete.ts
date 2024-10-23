export interface AutocompleteProps {
  options: AutocompleteOption[];
  onSelect: (selectedItem: AutocompleteOption) => void;
  placeholder: string;
  startIcon?: React.ReactNode;
  loading?: boolean;
  onInputChange?: (inputValue: string) => void;
}

export interface AutocompleteOption {
  label: string;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  onSelect: (selectedItem: AutocompleteOption) => void;
  placeholder: string;
  onInputChange: (inputValue: string) => void;
  startIcon?: React.ReactNode;
  loading?: boolean;
  defaultOptions?: AutocompleteOption[];
}

export interface AutocompleteOption {
  label: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

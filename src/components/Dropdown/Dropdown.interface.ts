export interface PropsDropdown {
  placeHolder: string,
  options: DropdownOption[],
  noOptionsMessage: string,
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface DropdownOption {
  value: string,
  label: string,
}

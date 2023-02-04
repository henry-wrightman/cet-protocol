import { UseFormRegister } from "react-hook-form";
import classNames from "classnames";
import ReactSelect from "react-select";

const defaultSelectStyles = {
  input: (provided: any, state: any) => ({
    ...provided,
    color: "white",
    cursor: "pointer",
  }),
  option: (provided: any, state: any) => ({
    color: "white",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1.5",
    backgroundColor: "#a855f7",
    textAlign: "left",
    cursor: "pointer",
    borderRadius: 10,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    ":hover": {
      backgroundColor: "#e5e7eb",
      color: "black",
    },
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    zIndex: -1,
    color: "white",
    fontColor: "white",
    fontOpacity: 1,
    backgroundColor: "#a855f7",
    border: 0,
    cursor: "pointer",
    padding: 0,
    boxShadow: "none",
    height: "30px",
    borderRadius: 10,
  }),
  menu: (base: any, state: any, styles: any) => ({
    ...base, // removing this actually makes the menu become in-line & expandable
    ...styles,
    zIndex: 999,
    marginTop: 5,
    cursor: "pointer",
    borderRadius: 10,
    backgroundColor: "#a855f7",
    opacity: 1,
    fontOpacity: 1,
  }),
  menuList: (base: any) => ({
    padding: 0,
    borderRadius: 10,
    backgroundColor: "#a855f7",
    opacity: 1,
    fontOpacity: 1,
  }),
  singleValue: (provided: any) => ({
    // selected value
    ...provided,
    color: "white",
    textAlign: "left",
  }),
  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: "white",
      textAlign: "left",
    };
  },
};

type SelectProps = {
  register?: UseFormRegister<any>;
  name: string;
  options: SelectOption[];
  onSelect?: any;
  disabled?: boolean;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  styles?: any;
  selectTextColorOverrides?: string;
  className?: string;
  defaultValue?: string;
};

export const Select = ({
  register,
  name,
  options,
  onSelect,
  placeholder,
  disabled,
  styles,
  className,
  isSearchable = false,
  isClearable = false,
  defaultValue,
}: SelectProps) => {
  const containerClasses = classNames(
    className,
    "z-50 border-b-[1px] rounded-md"
  );

  const reg = register ? { ...register(name) } : "";
  return (
    <ReactSelect
      {...reg}
      placeholder={placeholder}
      className={containerClasses}
      options={options}
      isDisabled={disabled}
      styles={styles || defaultSelectStyles}
      defaultValue={
        defaultValue
          ? options.filter((option) => option.value === defaultValue)[0]
          : undefined
      }
      components={{
        IndicatorSeparator: () => null,
        NoOptionsMessage: () => null,
      }}
      maxMenuHeight={120}
      isSearchable={isSearchable}
      isClearable={isClearable}
      onChange={onSelect}
    />
  );
};

export type SelectOption = {
  label: string;
  value: string | number;
};

import { UseFormRegister } from "react-hook-form";
import classNames from "classnames";

type InputProps = {
  register: UseFormRegister<any>;
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  type?: string;
  value?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const Input = ({
  register,
  name,
  placeholder = "",
  className,
  disabled,
  type = "text",
  value,
  onKeyDown = () => {},
}: InputProps) => {
  const classes = classNames(
    className,
    "block w-full px-2 py-2 border-[1px] border-gray-400 border-input-border-purple-800 sm:text-sm text-black rounded-xl"
    //"focus:outline-none"
  );
  return (
    <input
      className={classes}
      disabled={disabled}
      value={value}
      type={type}
      {...register(name, {
        valueAsNumber: type === "number" && true,
      })}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
};

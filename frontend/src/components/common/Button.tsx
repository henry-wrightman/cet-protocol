import { ReactNode } from "react";
import classnames from "classnames";
import { Spinner } from "./Spinner";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "reset" | "submit" | undefined;
  className?: string;
  disabled?: boolean;
  showLoader?: boolean;
};

export const Button = ({
  children,
  onClick,
  type = "button",
  className,
  disabled = false,
  showLoader = false,
}: ButtonProps) => {
  const classes = classnames(className, {
    "rounded-xl leading-10 flex justify-center items-center cursor-pointer shadow-sm bg-purple-800 text-white":
      true,
    "bg-primary/20": showLoader,
    "cursor-not-allowed": showLoader,
  });
  const content = showLoader ? <Spinner /> : children;
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

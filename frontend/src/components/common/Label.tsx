import classNames from "classnames";

type LabelProps = {
  children: string | string[];
  className?: string;
  ping?: boolean;
  required?: boolean;
  htmlFor?: string;
};

export const Label = ({
  children,
  className,
  required,
  ping,
  htmlFor,
}: LabelProps) => {
  const classes = classNames(className, "block text-xs font-semibold", {
    required: !!required,
  });

  return (
    <label htmlFor={htmlFor} className={classes}>
      {children}
      {ping && (
        <span className="animate-pulse t-1 center absolute h-1.5 w-1.5 rounded bg-sky-600 opacity-100"></span>
      )}
    </label>
  );
};

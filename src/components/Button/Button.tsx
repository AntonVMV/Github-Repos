import { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import "./index.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  btnType: "primary" | "secondary";
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  className,
  btnType,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={cn("button", className, btnType)}
      {...rest}
    >
      {text}
    </button>
  );
};

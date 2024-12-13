import { ReactNode } from "react";

interface ButtonPros {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "tertiary";
  loading?: boolean;
  disabledText?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  block?: boolean;
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  tabIndex?: number;
  as?: string;
  dataAttributes?: Record<string, string>;
  [key: string]: any;
}

export default function Button({ children, className, onClick }: ButtonPros) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

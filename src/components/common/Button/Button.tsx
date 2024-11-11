import React from "react";
import "./Button.scss";

interface ButtonProps {
  children?: React.ReactNode;
  onClick: VoidFunction;
  icon?: React.ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  icon,
  size = "medium",
  className = "",
}) => {
  return (
    <button onClick={onClick} className={`button button--${size} ${className}`}>
      {icon && <span className="button__icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;

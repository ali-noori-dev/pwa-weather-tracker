import React from "react";
import "./IconButton.scss";

interface IconButtonProps {
  children: React.ReactNode;
  onClick: VoidFunction;
  ariaLabel: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  ariaLabel,
  size = "medium",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`icon-button icon-button--${size} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default IconButton;

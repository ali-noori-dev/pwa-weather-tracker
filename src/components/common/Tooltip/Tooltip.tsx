import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./Tooltip.scss";

interface TooltipProps {
  title: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const showTooltip = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + rect.width / 2 + window.scrollX,
    });
    setIsVisible(true);
  };

  const hideTooltip = () => setIsVisible(false);

  return (
    <>
      <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            className="tooltip"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {title}
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;

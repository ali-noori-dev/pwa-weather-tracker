import { Property } from "csstype";
import React from "react";
import "./Flex.scss";

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Property.FlexDirection;
  justify?: Property.JustifyContent;
  align?: Property.AlignItems;
  wrap?: Property.FlexWrap;
  gap?: string;
}

const Flex: React.FC<FlexProps> = ({
  children,
  direction,
  justify,
  align,
  wrap,
  gap,
  className = "",
  ...rest
}) => {
  return (
    <div
      className={`flex ${className}`}
      style={{
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        gap,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Flex;

import React from "react";
import { Flex } from "../../common";

interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Center: React.FC<CenterProps> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <Flex
      justify="center"
      align="center"
      className={`center ${className}`}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default Center;

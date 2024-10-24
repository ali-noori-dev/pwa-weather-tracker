import React from "react";
import Flex, { FlexProps } from "../Flex/Flex";

const VerticalFlex: React.FC<Omit<FlexProps, "direction">> = ({
  children,
  ...rest
}) => {
  return (
    <Flex direction="column" {...rest}>
      {children}
    </Flex>
  );
};

export default VerticalFlex;

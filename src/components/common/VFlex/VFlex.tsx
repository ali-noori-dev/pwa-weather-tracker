import React from "react";
import { Flex, FlexProps } from "../../common";

const VFlex: React.FC<Omit<FlexProps, "direction">> = ({
  children,
  ...rest
}) => {
  return (
    <Flex direction="column" {...rest}>
      {children}
    </Flex>
  );
};

export default VFlex;

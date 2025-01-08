import { Flex, FlexProps } from "components/common";
import React from "react";

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

import { Box, Sx, Text } from "@mantine/core";
import { FC, ReactElement, ReactNode } from "react";

interface ITdProps {
  sx?: Sx | (Sx | undefined)[];
  children: ReactNode;
  align?:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
}

export const Td: FC<ITdProps> = ({ sx, children, align }): ReactElement => {
  return (
    <Box sx={{ ...sx, textAlign: align }} component="td">
      {children}
    </Box>
  );
};

export const Th: FC<ITdProps> = ({ sx, children, align }): ReactElement => {
  return (
    <Box sx={{ ...sx }} component="th">
      <Text align="center" weight="bold">
        {children}
      </Text>
    </Box>
  );
};

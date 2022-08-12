import { Badge, Group, Paper, Text } from "@mantine/core";
import { FC, ReactElement } from "react";

interface props {
  value: number;
  label: string;
}

const EquationCard: FC<props> = ({ value, label }): ReactElement => {
  return (
    <Paper withBorder shadow="md" p="md" radius="md">
      <Group align="center">
        <Text weight="bold">B{label}</Text>
        <Text align="center">{value}</Text>
      </Group>
      <Badge mt="md" color="teal" variant="filled" >Det A{label} / A</Badge>
    </Paper>
  );
};

export default EquationCard;

import { Group, Paper, Text } from "@mantine/core";
import { FC, ReactElement } from "react";

interface props {
  value: number;
  label: string;
}

const DeterminantCard: FC<props> = ({ value, label }): ReactElement => {
  return (
    <Paper withBorder shadow="md" radius="md">
      <Group p="md" align="center">
        <Text weight="bold">{label}</Text>
        <Text>{value}</Text>
      </Group>
    </Paper>
  );
};

export default DeterminantCard;

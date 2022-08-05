import { FC, ReactElement } from "react";
import { Card, Group, useMantineTheme, Text, Box } from "@mantine/core";
import { FileText } from "tabler-icons-react";

interface props {
  file: File;
}

const FileInfoCard: FC<props> = ({ file }): ReactElement => {
  const { colors } = useMantineTheme();
  return (
    <Card p="md" shadow="md" withBorder radius="md">
      <Group position="apart">
        <FileText size={40} color={colors.teal[6]} />
        <Box>
          <Text align="right" weight="bold" size="lg">
            {file.name}
          </Text>
          <Text align="right" color="dimmed" size="sm">
            {file.size}
          </Text>
        </Box>
      </Group>
    </Card>
  );
};

export default FileInfoCard;

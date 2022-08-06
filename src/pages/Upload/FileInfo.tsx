import { FC, ReactElement, useMemo } from "react";
import { Box, Center, useMantineTheme } from "@mantine/core";
import FileInfoCard from "./FileInfoCard";
import { ListDetails } from "tabler-icons-react";

interface props {
  files: File[];
}

const EmptyFiles: FC = (): ReactElement => {
  const { colors } = useMantineTheme();
  return (
    <Center sx={{ height: "100%", flexDirection: "column" }}>
      <ListDetails color={colors.gray[5]} size={80} strokeWidth={1} />
    </Center>
  );
};

const FileInfo: FC<props> = ({ files }): ReactElement => {
  const renderFileCard = useMemo(
    () =>
      files.map((file) => (
        <FileInfoCard
          key={`${file.arrayBuffer}${file.lastModified}${file.name}`}
          file={file}
        />
      )),
    [files]
  );
  return <Box p="md">{files.length > 0 ? renderFileCard : <EmptyFiles />}</Box>;
};

export default FileInfo;

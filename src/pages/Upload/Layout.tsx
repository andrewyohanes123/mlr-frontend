import { FC, ReactElement, useCallback, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Group,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconX, IconFileText } from "@tabler/icons";
import Papa from "papaparse";
import FileInfo from "./FileInfo";
import { FileText } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import { useErrorCatcher } from "hooks/useErrorCatcher";
import useModels from "hooks/useModels";

const MAX_FILE_SIZE = 3 * 1024 ** 2;
const ICON_SIZE = 70;

export type TCSVData = {
  age: number;
  gender: string;
  occupation: string;
  x1: string;
  x2: string;
  x3: string;
  x4: string;
};

const Layout: FC = (): ReactElement => {
  const theme = useMantineTheme();
  const [files, setFiles] = useState<File[]>([]);
  const { errorCatcher } = useErrorCatcher();
  const {
    models: { Variable },
  } = useModels();
  const [data, setData] = useState<TCSVData[]>([]);
  const [loading, toggleLoading] = useState<boolean>(false);

  const onDrop = useCallback((files: File[]) => {
    setFiles(files);
    const [file] = files;
    // @ts-ignore
    Papa.parse<TCSVData, File>(file, {
      header: true,
      skipEmptyLines: true,
      complete(results, file) {
        setData(results.data as TCSVData[]);
      },
      transformHeader(header, index) {
        switch (header) {
          case "Usia":
            return "age";
          case "Jenis Kelamin":
            return "gender";
          case "Pekerjaan":
            return "occupation";
          case "Pendapatan (X1)":
            return "x1";
          case "Pendidikan (X2)":
            return "x2";
          case "Pekerjaan (X3)":
            return "x3";
          case "Jumlah Anggota Keluarga (X4)":
            return "x4";
          default:
            return "no";
        }
      },
      transform: (value, field) => {
        if (field === "age") {
          return parseInt(value.replace(/tahun/g, "").trim(), 10);
        }
        return value
      },
    });
  }, []);

  const onReject = useCallback(() => {
    showNotification({
      title: "File tidak valid",
      message: "Masukkan file CSV yang valid",
      color: "red",
    });
  }, []);

  const createData = useCallback(() => {
    toggleLoading(true);
    Promise.all(data.map((d) => Variable.create({ ...d })))
      .then((results) => {
        toggleLoading(false);
        showNotification({
          title: "Input data selesai",
          message: `Berhasil memasukkan ${results.length} data`,
          color: "green",
        });
        setFiles([]);
        setData([]);
      })
      .catch(errorCatcher);
  }, [Variable, data, errorCatcher]);

  return (
    <Box>
      <Group my="md" align="center" spacing="md">
        <FileText />
        <Title order={4}>Masukkan File CSV</Title>
      </Group>
      <Grid sx={{ height: "100%" }} align="center" gutter="md">
        <Grid.Col span={6}>
          <Dropzone
          loading={loading}
            onDrop={onDrop}
            onReject={onReject}
            maxSize={MAX_FILE_SIZE}
            accept={["text/csv"]}
            maxFiles={1}
            multiple={false}
          >
            <Group
              position="center"
              spacing="xs"
              style={{ minHeight: 220, pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  size={ICON_SIZE}
                  stroke={1.5}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "dark" ? 4 : 6
                    ]
                  }
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size={ICON_SIZE}
                  stroke={1.5}
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconFileText size={ICON_SIZE} stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Seret file CSV di sini
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Masukkan file CSV
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Grid.Col>
        <Grid.Col span={6}>
          <FileInfo files={files} />
          {files.length > 0 && (
            <Button loading={loading} onClick={createData} fullWidth>
              Masukkan Data
            </Button>
          )}
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Layout;
import { Box, Button, Paper, Text, Title } from "@mantine/core";
import { AxiosAdapter } from "App";
import { useErrorCatcher } from "hooks/useErrorCatcher";
import useModels from "hooks/useModels";
import { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { Trash } from "tabler-icons-react";

const DeleteAllData: FC = (): ReactElement => {
  const [dataCount, setDataCount] = useState<number>(0);
  const {
    models: { Variable },
  } = useModels();
  const { errorCatcher } = useErrorCatcher();
  const [deleting, toggleDeleting] = useState<boolean>(false);

  useEffect(() => {
    Variable.collection({
      limit: 0,
      offset: 0,
    })
      .then((resp) => {
        setDataCount(resp.count);
      })
      .catch(errorCatcher);

    return () => {};
  }, [Variable, errorCatcher, deleting]);

  const deleteData = useCallback(() => {
    toggleDeleting(true);
    AxiosAdapter.rawDelete<{ data: { deleted_rows: number } }>(
      "variables/all",
      "api"
    )
      .then((resp) => {
        toggleDeleting(false);
        console.log(resp.data.deleted_rows);
      })
      .catch(errorCatcher);
  }, [errorCatcher]);

  return (
    <Box my="md">
      <Paper withBorder shadow="md" radius="md" p="md">
        <Title order={5}>Hapus Data</Title>
        <Text>Total data: {dataCount} data</Text>
        <Button
          color="red"
          onClick={deleteData}
          variant="light"
          leftIcon={<Trash />}
          fullWidth
          loading={deleting}
          my="md"
        >
          Hapus semua data
        </Button>
      </Paper>
    </Box>
  );
};

export default DeleteAllData;

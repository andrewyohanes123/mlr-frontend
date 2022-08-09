import { FC, ReactElement, useEffect, useState } from "react";
import { AxiosAdapter } from "App";
import { CalculatedMatrix } from "types/global";
import { useErrorCatcher } from "hooks/useErrorCatcher";
import { Box, Grid, Paper } from "@mantine/core";
import MatrixTable, { MatrixHTable } from "./MatrixTable";

const initialState: CalculatedMatrix = {
  matrixA: [],
  matrixA1: [],
  matrixA2: [],
  matrixA3: [],
  matrixA4: [],
  matrixA5: [],
  matrixH: [],
};

const MatrixCalculations: FC = (): ReactElement => {
  const [matrix, setMatrix] = useState<CalculatedMatrix>(initialState);
  const { errorCatcher } = useErrorCatcher();

  useEffect(() => {
    AxiosAdapter.rawGet<CalculatedMatrix>(
      "variables/calculated-variables",
      "api"
    )
      .then((resp) => {
        setMatrix(resp.data);
      })
      .catch(errorCatcher);
  }, [errorCatcher]);

  return (
    <Box>
      <Grid gutter="lg">
        <Grid.Col span={3}>
          <Paper shadow="lg" p="sm" radius="md" withBorder>
            <MatrixHTable matrix={matrix.matrixH} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper shadow="lg" p="sm" radius="md" withBorder>
            <MatrixTable matrix={matrix.matrixA} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper shadow="lg" p="sm" radius="md" withBorder>
            <MatrixTable matrix={matrix.matrixA1} matrixNum={1} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper shadow="lg" p="sm" radius="md" withBorder>
            <MatrixTable matrix={matrix.matrixA2} matrixNum={2} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper shadow="lg" p="sm" radius="md" withBorder>
            <MatrixTable matrix={matrix.matrixA3} matrixNum={3} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper shadow="lg" p="sm" radius="md" withBorder>
            <MatrixTable matrix={matrix.matrixA4} matrixNum={4} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper shadow="lg" p="sm" radius="md" withBorder>
            <MatrixTable matrix={matrix.matrixA5} matrixNum={5} />
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default MatrixCalculations;

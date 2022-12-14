import { FC, ReactElement } from "react";
import { CalculatedMatrix } from "types/global";
import { Box, Grid, Paper } from "@mantine/core";
import MatrixTable, { MatrixHTable } from "./MatrixTable";

export const initialMatrixState: CalculatedMatrix = {
  matrixA: [],
  matrixA1: [],
  matrixA2: [],
  matrixA3: [],
  matrixA4: [],
  matrixA5: [],
  matrixH: [],
  detA: 0,
  detA1: 0,
  detA2: 0,
  detA3: 0,
  detA4: 0,
  detA5: 0,
  b1: 0,
  b2: 0,
  b3: 0,
  b4: 0,
  b5: 0
};

interface props {
  matrix: CalculatedMatrix;
}

const MatrixCalculations: FC<props> = ({matrix}): ReactElement => {

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

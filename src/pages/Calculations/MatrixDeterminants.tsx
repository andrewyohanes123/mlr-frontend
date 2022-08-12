import { FC, ReactElement } from 'react'
import { Box, Grid, } from '@mantine/core';
import DeterminantCard from './DeterminantCard';
import { CalculatedMatrix } from 'types/global';

interface props {
  matrix: CalculatedMatrix;
}

const MatrixDeterminants: FC<props> = ({matrix}) : ReactElement=> {
  return (
    <Box>
      <Grid gutter="lg">
        <Grid.Col span={4}>
          <DeterminantCard label="DET(A)" value={matrix.detA} />
        </Grid.Col>
        <Grid.Col span={4}>
          <DeterminantCard label="DET(A1)" value={matrix.detA1} />
        </Grid.Col>
        <Grid.Col span={4}>
          <DeterminantCard label="DET(A2)" value={matrix.detA2} />
        </Grid.Col>
        <Grid.Col span={4}>
          <DeterminantCard label="DET(A3)" value={matrix.detA3} />
        </Grid.Col>
        <Grid.Col span={4}>
          <DeterminantCard label="DET(A4)" value={matrix.detA4} />
        </Grid.Col>
        <Grid.Col span={4}>
          <DeterminantCard label="DET(A5)" value={matrix.detA5} />
        </Grid.Col>
      </Grid>
    </Box>
  )
}

export default MatrixDeterminants
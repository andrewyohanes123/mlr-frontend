import { AxiosAdapter } from 'App';
import { useErrorCatcher } from 'hooks/useErrorCatcher';
import { FC, ReactElement, useEffect, useState } from 'react'
import { CalculatedMatrix } from 'types/global';
import { initialMatrixState } from './MatrixCalculations';
import { Box, Grid, } from '@mantine/core';
import DeterminantCard from './DeterminantCard';

const MatrixDeterminants: FC = () : ReactElement=> {
  const [matrix, setMatrix] = useState<CalculatedMatrix>(initialMatrixState);
  const {errorCatcher} = useErrorCatcher();

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
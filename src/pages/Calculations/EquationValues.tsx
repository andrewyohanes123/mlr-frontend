import { Box, Grid } from '@mantine/core';
import { ReactElement, FC } from 'react'
import { CalculatedMatrix } from 'types/global'
import EquationCard from './EquationCard';

interface props {
  matrix: CalculatedMatrix;
}

const EquationValues: FC<props> = ({matrix}): ReactElement => {
  return (
    <Box>
      <Grid gutter={"lg"}>
        <Grid.Col span={4}>
          <EquationCard label='1' value={matrix.b1} />
        </Grid.Col>
        <Grid.Col span={4}>
          <EquationCard label='2' value={matrix.b2} />
        </Grid.Col>
        <Grid.Col span={4}>
          <EquationCard label='3' value={matrix.b3} />
        </Grid.Col>
        <Grid.Col span={4}>
          <EquationCard label='4' value={matrix.b4} />
        </Grid.Col>
        <Grid.Col span={4}>
          <EquationCard label='5' value={matrix.b5} />
        </Grid.Col>
      </Grid>
    </Box>
  )
}

export default EquationValues
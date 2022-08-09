import { FC, ReactElement, useMemo } from "react";
import { Box, Table, Text } from "@mantine/core";

interface props {
  matrixNum?: number;
  matrix: number[][];
}

const MatrixTable: FC<props> = ({ matrixNum = 0, matrix }): ReactElement => {
  const tableData = useMemo(
    () =>
      matrix.map((item, idx) => (
        <tr key={`${Math.round(idx + Math.random() * 1000)}${item.length}`}>
          {item.map((val, id) => (
            <Box
              component="td"
              sx={({ colors }) => ({
                background: id === matrixNum - 1 ? colors.orange[4] : undefined,
              })}
              key={`${Math.round(idx + id + Math.random() * 1000)}${
                item.length
              }${id}`}
            >
              <Text align="center">{val.toFixed(3)}</Text>
            </Box>
          ))}
        </tr>
      )),
    [matrix, matrixNum]
  );

  return (
    <Box>
      <Table verticalSpacing="md">
        <thead>
          <tr>
            <th colSpan={5}>
              <Text weight="bold" align="center">
                Tentukan Matrix A{matrixNum === 0 ? "" : matrixNum}
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </Table>
    </Box>
  );
};

export default MatrixTable;

interface MatrixHProps {
  matrix: number[];
}

const MatrixHTable: FC<MatrixHProps> = ({ matrix }): ReactElement => {
  const tableData = useMemo(
    () =>
      matrix.map((item, idx) => (
        <Box
          component="tr"
          sx={({ colors }) => ({
            background: colors.orange[4],
          })}
          key={`${Math.round(idx + Math.random() * 1000)}`}
        >
          <td key={`${Math.round(idx * Math.random() * 1000)}`}>
            <Text color="dark" align="center">
              {item.toFixed(3)}
            </Text>
          </td>
        </Box>
      )),
    [matrix]
  );

  return (
    <Box>
      <Table verticalSpacing="md">
        <thead>
          <tr>
            <th colSpan={5}>
              <Text weight="bold" align="center">
                Matrix H
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </Table>
    </Box>
  );
};

export { MatrixHTable };

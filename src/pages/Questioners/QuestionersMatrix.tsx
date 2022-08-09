import { Box, Table, Text } from "@mantine/core";
import { Th } from "components";
import { generateTotalMatrix } from "pages/functions";
import { FC, ReactElement, useMemo } from "react";
import { TFirstStep, VariableAttributes } from "types/global";

interface props {
  data: VariableAttributes[];
}

const matrixColumns = {
  x1y: "X1Y",
  x2y: "X2Y",
  x3y: "X3Y",
  x4y: "X4Y",
  x1x2: "X1X2",
  x1x3: "X1X3",
  x1x4: "X1X4",
  x2x3: "X2X3",
  x2x4: "X2X4",
  x3x4: "X3X4",
  x12: <>X1&#178;</>,
  x22: <>X2&#178;</>,
  x32: <>X2&#178;</>,
  x42: <>X4&#178;</>,
};

const QuestionersMatrix: FC<props> = ({ data }): ReactElement => {
  const tableColumnHeader = useMemo(
    () => (
      <tr>
        {Object.keys(matrixColumns).map((key, idx) => (
          <Th key={`${idx}${key}`}>
            {matrixColumns[key as keyof typeof matrixColumns]}
          </Th>
        ))}
      </tr>
    ),
    []
  );

  const tableFooter = useMemo(
    () => (
      <Box
        component="tr"
        sx={({ colors }) => ({
          background: colors.grape[8],
          "& div": {
            color: "white",
          },
        })}
      >
        {Object.keys(matrixColumns).map((key, idx) => (
          <Th
            sx={(theme) => ({ background: theme.colors.grape[5] })}
            key={`${idx}${key}`}
          >
            {generateTotalMatrix(
              data.map((d) => d.first_step),
              key as keyof TFirstStep
            ).toFixed(3)}
          </Th>
        ))}
      </Box>
    ),
    [data]
  );

  const tableData = useMemo(
    () =>
      data.map((variable) => (
        <tr key={`${variable.id}${variable.x1}${variable.x2}${variable.age}`}>
          {Object.keys(matrixColumns).map((key, idx) => (
            <td key={`${idx}${key}`}>
              <Text align="center">
                {variable.first_step[key as keyof typeof matrixColumns].toFixed(
                  2
                )}
              </Text>
            </td>
          ))}
        </tr>
      )),
    [data]
  );

  return (
    <Table verticalSpacing="md" striped my="md">
      <thead>{tableColumnHeader}</thead>
      <tbody>{tableData}</tbody>
      <tfoot>{tableFooter}</tfoot>
    </Table>
  );
};

export default QuestionersMatrix;

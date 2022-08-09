import { TFirstStep } from "types/global";

export const generateTotalMatrix = (
  matrixData: TFirstStep[],
  column: keyof TFirstStep
): number => {
  if (matrixData.length === 0) return 0;
  return Math.fround(matrixData.map((data) => data[column]).reduce((a, b) => a + b));
};

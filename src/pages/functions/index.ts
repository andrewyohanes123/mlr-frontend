import { TFirstStep } from "types/global";

export const generateTotalMatrix = (
  matrixData: TFirstStep[],
  column: keyof TFirstStep
): number => {
  if (matrixData.length === 0) return 0;
  return Math.fround(
    matrixData.map((data) => data[column]).reduce((a, b) => a + b)
  );
};

export function bytesToSize(bytes: number): string {
  const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  var i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
}
